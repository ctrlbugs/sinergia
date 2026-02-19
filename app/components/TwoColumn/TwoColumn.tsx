'use client';

import Image from 'next/image';
import { handleSignUp } from '@/app/config/constants';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function TwoColumn() {
  const { t } = useLanguage();
  return (
    <section className="section section-gray">
      <div className="section-container">
        <div className="two-column">
          <div className="two-column-image fade-in">
            {/* Using img tag instead of Next.js Image for cache-busting with query params */}
            <img
              src="/images/image 38.png?v=2"
              alt="TradePAT Cryptocurrencies"
              className="two-column-image-content"
              width={500}
              height={500}
            />
          </div>
          <div className="two-column-text fade-in">
            <div className="section-badge">{t('twoColumn.badge')}</div>
            <h2>{t('twoColumn.title')}</h2>
            <p>
              {t('twoColumn.subtitle')}
            </p>
            <a href="#" onClick={handleSignUp} className="btn btn-black btn-large">
              {t('twoColumn.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
