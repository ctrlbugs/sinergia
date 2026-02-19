import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Email service configuration
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    password: string;
  };
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: string | Buffer;
    contentType?: string;
  }>;
  priority?: 'high' | 'normal' | 'low';
  tags?: string[];
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  retryCount?: number;
}

interface EmailQueueItem {
  options: EmailOptions;
  retryCount: number;
  maxRetries: number;
  timestamp: number;
}

// Email service class with advanced features
class EmailService {
  private transporter: Transporter | null = null;
  private emailQueue: EmailQueueItem[] = [];
  private isProcessingQueue = false;
  private dailyEmailCount = 0;
  private dailyLimit = 500; // Namecheap limit (adjustable)
  private rateLimitDelay = 100; // Delay between emails in ms
  private lastEmailTime = 0;

  constructor() {
    this.loadDailyCount();
    this.resetDailyCountIfNeeded();
  }

  // Get SMTP configuration from environment variables
  private getEmailConfig(): EmailConfig {
    return {
      host: process.env.SMTP_HOST || 'server319.web-hosting.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: process.env.SMTP_USER || '',
        password: process.env.SMTP_PASSWORD || '',
      },
    };
  }

  // Initialize transporter
  private initializeTransporter(): Transporter | null {
    if (this.transporter) {
      return this.transporter;
    }

    const config = this.getEmailConfig();
    
    // Enhanced logging for debugging
    console.log('🔍 SMTP Configuration Check:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      hasUser: !!config.auth.user,
      hasPassword: !!config.auth.password,
      user: config.auth.user || 'NOT SET',
      envVars: {
        SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
        SMTP_PORT: process.env.SMTP_PORT || 'NOT SET',
        SMTP_USER: process.env.SMTP_USER || 'NOT SET',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD ? '***SET***' : 'NOT SET',
      },
    });
    
    if (!config.auth.user || !config.auth.password) {
      console.error('❌ SMTP credentials not configured. Email sending will be disabled.');
      console.error('Missing:', {
        user: !config.auth.user ? 'SMTP_USER (required)' : 'OK',
        password: !config.auth.password ? 'SMTP_PASSWORD (required)' : 'OK',
      });
      console.error('💡 Solution: Create .env.local file in landing-page-nextjs folder with SMTP credentials');
      console.error('💡 After creating .env.local, RESTART your Next.js server');
      return null;
    }

    try {
      // For port 465, we need secure: true and proper SSL configuration
      const transporterConfig: any = {
        host: config.host,
        port: config.port,
        secure: config.port === 465, // Port 465 requires SSL
        auth: {
          user: config.auth.user,
          pass: config.auth.password, // nodemailer uses 'pass' not 'password'
        },
        requireTLS: config.port === 587, // Port 587 uses STARTTLS
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
          // Remove SSLv3 cipher (deprecated) - let server negotiate
        },
        debug: process.env.NODE_ENV === 'development', // Enable debug logging in dev
        logger: process.env.NODE_ENV === 'development', // Enable logger in dev
      };

      // For port 465 (SSL), don't use pool initially
      if (config.port === 465) {
        transporterConfig.secure = true;
      } else {
        transporterConfig.pool = true;
        transporterConfig.maxConnections = 5;
        transporterConfig.maxMessages = 100;
        transporterConfig.rateDelta = 1000;
        transporterConfig.rateLimit = 1;
      }

      this.transporter = nodemailer.createTransport(transporterConfig);

      // Verify connection (async, but don't block - verification happens on first send)
      // Note: verify() is optional - emails can still send without it
      this.transporter.verify().then(() => {
        console.log('✅ SMTP connection verified successfully');
      }).catch((error) => {
        console.error('⚠️ SMTP verification warning (emails may still send):', {
          error: error.message,
          code: error.code,
        });
        // Don't set transporter to null - allow sending to proceed
        // Some servers don't support verify() but still accept emails
      });

      console.log('✅ SMTP transporter created successfully');
      return this.transporter;
    } catch (error) {
      console.error('Error creating email transporter:', error);
      return null;
    }
  }

  // Validate email address
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate email options
  private validateEmailOptions(options: EmailOptions): { valid: boolean; error?: string } {
    // Validate 'to' field
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    for (const email of recipients) {
      if (!this.validateEmail(email)) {
        return { valid: false, error: `Invalid email address: ${email}` };
      }
    }

    // Validate subject
    if (!options.subject || options.subject.trim().length === 0) {
      return { valid: false, error: 'Email subject is required' };
    }

    // Validate HTML content
    if (!options.html || options.html.trim().length === 0) {
      return { valid: false, error: 'Email content is required' };
    }

    // Check daily limit
    if (this.dailyEmailCount >= this.dailyLimit) {
      return { valid: false, error: `Daily email limit reached (${this.dailyLimit} emails)` };
    }

    return { valid: true };
  }

  // Rate limiting
  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastEmail = now - this.lastEmailTime;
    
    if (timeSinceLastEmail < this.rateLimitDelay) {
      await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay - timeSinceLastEmail));
    }
    
    this.lastEmailTime = Date.now();
  }

  // Track daily email count
  private incrementDailyCount(): void {
    this.dailyEmailCount++;
    this.saveDailyCount();
  }

  // Save daily count to localStorage (for server-side, use database)
  private saveDailyCount(): void {
    if (typeof window === 'undefined') {
      // Server-side: Could save to database or file
      // For now, we'll use a simple in-memory counter
      // In production, use Redis or database
    }
  }

  // Load daily count
  private loadDailyCount(): void {
    // In production, load from database
    // For now, reset daily
    const today = new Date().toDateString();
    const storedDate = process.env.EMAIL_COUNT_DATE || '';
    
    if (storedDate !== today) {
      this.dailyEmailCount = 0;
    }
  }

  // Reset daily count if needed
  private resetDailyCountIfNeeded(): void {
    const today = new Date().toDateString();
    const storedDate = process.env.EMAIL_COUNT_DATE || '';
    
    if (storedDate !== today) {
      this.dailyEmailCount = 0;
      process.env.EMAIL_COUNT_DATE = today;
    }
  }

  // Send email with retry logic
  private async sendWithRetry(
    options: EmailOptions,
    retryCount = 0,
    maxRetries = 3
  ): Promise<EmailResult> {
    const transporter = this.initializeTransporter();
    
    if (!transporter) {
      return {
        success: false,
        error: 'Email transporter not available. Check SMTP configuration.',
        retryCount,
      };
    }

    // Validate email options
    const validation = this.validateEmailOptions(options);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        retryCount,
      };
    }

    // Rate limiting
    await this.rateLimit();

    // CRITICAL: "from" address MUST match the authenticated SMTP user
    // Some SMTP servers reject emails if "from" doesn't match authenticated user
    const config = this.getEmailConfig();
    
    // Use the authenticated user as "from" address (required by many SMTP servers)
    const authenticatedUser = config.auth.user;
    const requestedFrom = options.from || process.env.SMTP_FROM;
    
    // If requested "from" doesn't match authenticated user, use authenticated user
    // This ensures emails are not rejected by SMTP server
    const fromAddress = (requestedFrom && requestedFrom === authenticatedUser) 
      ? requestedFrom 
      : authenticatedUser;
    
    console.log(`📧 Sending email:`, {
      from: fromAddress,
      to: options.to,
      authenticatedUser: authenticatedUser,
      requestedFrom: requestedFrom,
    });
    
    const mailOptions = {
      from: `"TradePAT" <${fromAddress}>`, // Use name and email format
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || fromAddress,
      cc: Array.isArray(options.cc) ? options.cc.join(', ') : options.cc,
      bcc: Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc,
      attachments: options.attachments,
      priority: options.priority || 'normal',
      headers: {
        'X-Priority': options.priority === 'high' ? '1' : options.priority === 'low' ? '5' : '3',
        'X-Mailer': 'TradePAT Email Service',
        'X-Tags': options.tags?.join(', ') || '',
        'Message-ID': `<${Date.now()}-${Math.random().toString(36)}@tradepat.com>`,
      },
    };

    try {
      console.log(`📤 Attempting to send email via SMTP...`);
      const info = await transporter.sendMail(mailOptions);
      
      // Increment daily count
      this.incrementDailyCount();

      // Log success with full details
      console.log(`✅ Email sent successfully!`, {
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected,
        to: options.to,
        subject: options.subject,
        from: fromAddress,
        dailyCount: this.dailyEmailCount,
      });

      return {
        success: true,
        messageId: info.messageId,
        retryCount,
      };
    } catch (error: any) {
      const errorDetails = {
        error: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        mailOptions: {
          from: fromAddress,
          to: options.to,
          subject: options.subject,
        },
      };
      
      console.error(`❌ Email send failed (attempt ${retryCount + 1}/${maxRetries + 1}):`, errorDetails);

      // Retry logic for transient errors
      if (retryCount < maxRetries && this.isRetryableError(error)) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`⏳ Retrying email in ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.sendWithRetry(options, retryCount + 1, maxRetries);
      }

      return {
        success: false,
        error: error.message || error.toString() || 'Failed to send email',
        retryCount,
      };
    }
  }

  // Check if error is retryable
  private isRetryableError(error: any): boolean {
    const retryableErrors = [
      'ECONNECTION',
      'ETIMEDOUT',
      'ESOCKET',
      'EAUTH',
      'EMESSAGE',
    ];

    return retryableErrors.some(code => error.code?.includes(code));
  }

  // Public method to send email
  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    return this.sendWithRetry(options);
  }

  // Send bulk emails (with rate limiting)
  async sendBulkEmails(
    emails: EmailOptions[],
    onProgress?: (sent: number, total: number) => void
  ): Promise<EmailResult[]> {
    const results: EmailResult[] = [];
    let sent = 0;

    for (const emailOptions of emails) {
      // Check daily limit before sending
      if (this.dailyEmailCount >= this.dailyLimit) {
        console.warn(`⚠️ Daily email limit reached. Stopping bulk send.`);
        break;
      }

      const result = await this.sendEmail(emailOptions);
      results.push(result);
      sent++;

      if (onProgress) {
        onProgress(sent, emails.length);
      }

      // Small delay between bulk emails
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return results;
  }

  // Get email statistics
  getStats(): {
    dailyCount: number;
    dailyLimit: number;
    remaining: number;
    queueLength: number;
  } {
    return {
      dailyCount: this.dailyEmailCount,
      dailyLimit: this.dailyLimit,
      remaining: Math.max(0, this.dailyLimit - this.dailyEmailCount),
      queueLength: this.emailQueue.length,
    };
  }

  // Test email connection
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    const transporter = this.initializeTransporter();
    
    if (!transporter) {
      return {
        success: false,
        error: 'Email transporter not available. Check SMTP configuration.',
      };
    }

    try {
      await transporter.verify();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to verify SMTP connection',
      };
    }
  }
}

// Singleton instance
const emailService = new EmailService();

// Export functions for backward compatibility
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const result = await emailService.sendEmail(options);
  return result.success;
}

// Export new advanced functions
export async function sendEmailAdvanced(options: EmailOptions): Promise<EmailResult> {
  return emailService.sendEmail(options);
}

export async function sendBulkEmails(
  emails: EmailOptions[],
  onProgress?: (sent: number, total: number) => void
): Promise<EmailResult[]> {
  return emailService.sendBulkEmails(emails, onProgress);
}

export function getEmailStats() {
  return emailService.getStats();
}

export async function testEmailConnection() {
  return emailService.testConnection();
}

// Get dashboard URL based on environment
export function getDashboardUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://dashboard.tradepat.com';
  }
  return 'http://localhost:3000';
}
