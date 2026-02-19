'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <section className="about-section fade-in" id="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-badge">{t('about.badge')}</div>
          <h2 className="about-title">{t('about.title')}</h2>
          <p className="about-intro">
            {t('about.intro')}
          </p>
        </div>
        
        <div className="about-content-wrapper">
          <div className="about-content-left">
            <p className="about-description">
              Sinergia Negotium Limited is driving procurement transformation through the design and implementation of a modern e-procurement portal. This initiative is focused on digitizing procurement processes, improving transparency, strengthening compliance, and enhancing operational efficiency.
            </p>
            <p className="about-description">
              By integrating <strong>structured workflows</strong>, <strong>intelligent system architecture</strong>, and <strong>strategic advisory support</strong>, the platform is built to streamline tender management, vendor participation, bid evaluation, and procurement oversight — all within a secure and scalable digital framework.
            </p>
          </div>
          
          <div className="about-content-right">
            <div className="about-highlight-box">
              <p>Our approach ensures improved governance, reduced administrative bottlenecks, and greater accountability across procurement operations.</p>
            </div>
            
            <div className="about-features-grid">
              <div className="about-feature-card fade-in">
                <div className="about-feature-icon">
                  <span className="material-icons">store</span>
                </div>
                <div className="about-feature-text">
                  <span>E-Procurement Portal</span>
                </div>
              </div>
              
              <div className="about-feature-card fade-in">
                <div className="about-feature-icon">
                  <span className="material-icons">admin_panel_settings</span>
                </div>
                <div className="about-feature-text">
                  <span>Digital Governance</span>
                </div>
              </div>
              
              <div className="about-feature-card fade-in">
                <div className="about-feature-icon">
                  <span className="material-icons">verified</span>
                </div>
                <div className="about-feature-text">
                  <span>Procurement Compliance</span>
                </div>
              </div>
              
              <div className="about-feature-card fade-in">
                <div className="about-feature-icon">
                  <span className="material-icons">gavel</span>
                </div>
                <div className="about-feature-text">
                  <span>Electronic Tendering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-closing">
          <p>"Procurement is not just the act of purchasing—it is the strategic engine that drives transparency, accountability, and sustainable growth."</p>
        </div>
      </div>
    </section>
  );
}

