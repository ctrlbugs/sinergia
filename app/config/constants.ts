// Landing Page Configuration
export const LandingPageConfig = {
  // Authentication URLs - Dynamic based on environment
  get authSignUpUrl() {
    if (typeof window !== 'undefined') {
      // Check if we're in production (dashboard.sinergianegotium.com) or localhost
      const isProduction = window.location.hostname === 'dashboard.sinergianegotium.com' || 
                          window.location.hostname === 'sinergianegotium.com' ||
                          window.location.hostname.includes('sinergianegotium.com');
      
      if (isProduction) {
        return 'https://dashboard.sinergianegotium.com';
      }
      return 'http://localhost:3000';
    }
    // Server-side: check NODE_ENV
    return process.env.NODE_ENV === 'production' 
      ? 'https://dashboard.sinergianegotium.com'
      : 'http://localhost:3000';
  },
  
  get authSignInUrl() {
    return this.authSignUpUrl; // Same URL for sign in
  },
  
  get dashboardUrl() {
    if (typeof window !== 'undefined') {
      const isProduction = window.location.hostname === 'dashboard.sinergianegotium.com' || 
                          window.location.hostname === 'sinergianegotium.com' ||
                          window.location.hostname.includes('sinergianegotium.com');
      
      if (isProduction) {
        return 'https://dashboard.sinergianegotium.com';
      }
      return 'http://localhost:3000';
    }
    return process.env.NODE_ENV === 'production' 
      ? 'https://dashboard.sinergianegotium.com'
      : 'http://localhost:3000';
  },
  
  // API endpoints
  apiBaseUrl: '/api',
  
  // Feature flags
  enableNews: true,
  enableTicker: true,
  enableLanguageSelector: true,
} as const;

// Auth handler functions
export const handleSignUp = () => {
  if (typeof window !== 'undefined') {
    window.location.href = LandingPageConfig.authSignUpUrl;
  } else {
    console.warn('Sign up URL not configured');
  }
};

export const handleSignIn = () => {
  if (typeof window !== 'undefined') {
    window.location.href = LandingPageConfig.authSignInUrl;
  } else {
    console.warn('Sign in URL not configured');
  }
};

export const handleLearnMore = () => {
  if (typeof window !== 'undefined') {
    window.location.href = LandingPageConfig.dashboardUrl;
  }
};

export const handleGetStarted = () => {
  if (typeof window !== 'undefined') {
    window.location.href = LandingPageConfig.authSignUpUrl;
  }
};

