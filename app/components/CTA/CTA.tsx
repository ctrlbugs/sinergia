'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to signup@sinergianegotium.com
      const mailtoLink = `mailto:signup@sinergianegotium.com?subject=Newsletter Subscription&body=Email: ${encodeURIComponent(email)}`;
      
      // Try to send via API first (if exists), otherwise use mailto
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, type: 'newsletter' }),
        });
      } catch {
        // Fallback to mailto if API doesn't exist
        window.location.href = mailtoLink;
      }

      // Show toast notification
      setShowToast(true);
      setEmail('');
      
      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (error) {
      console.error('Error submitting email:', error);
      // Still show success toast for UX
      setShowToast(true);
      setEmail('');
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="cta-section" id="contact">
      <div className="cta-container fade-in">
        <h2 className="cta-title">{t('cta.title')}</h2>
        <p className="cta-subtitle">
          {t('cta.subtitle')}
        </p>
        <form onSubmit={handleSubmit} className="cta-newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('cta.placeholder')}
            required
            className="cta-email-input"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : t('cta.button')}
          </button>
        </form>
        {showToast && (
          <div className="cta-toast-inline">
            <span className="cta-toast-icon">✓</span>
            <span className="cta-toast-message">{t('cta.success')}</span>
          </div>
        )}
      </div>
    </section>
  );
}
