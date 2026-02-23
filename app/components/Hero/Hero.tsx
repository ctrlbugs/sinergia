'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { handleSignUp } from '@/app/config/constants';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const heroSectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const flipIndexRef = useRef<number>(0);

  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const heroImages = ['/images/Hero11.png', '/images/Hero22.png'];

  const [heroBadges, setHeroBadges] = useState([
    t('hero.badge.crypto'),
    t('hero.badge.stock'),
  ]);

  const [heroTitles, setHeroTitles] = useState([
    t('hero.title1'),
    t('hero.title2'),
    t('hero.title3'),
    t('hero.title4'),
  ]);

  const [heroSubtitles, setHeroSubtitles] = useState([
    t('hero.subtitle1'),
    t('hero.subtitle2'),
    t('hero.subtitle3'),
    t('hero.subtitle4'),
  ]);

  // Update titles, subtitles, and badges when language changes
  useEffect(() => {
    setHeroBadges([t('hero.badge.crypto'), t('hero.badge.stock')]);
    setHeroTitles([t('hero.title1'), t('hero.title2'), t('hero.title3'), t('hero.title4')]);
    setHeroSubtitles([t('hero.subtitle1'), t('hero.subtitle2'), t('hero.subtitle3'), t('hero.subtitle4')]);
  }, [language, t]);

  // Rotate badge every 30 seconds
  useEffect(() => {
    badgeRefs.current[0]?.classList.add('active');
    const badgeInterval = setInterval(() => {
      setCurrentBadgeIndex((prev) => {
        badgeRefs.current[prev]?.classList.remove('active');
        const next = (prev + 1) % heroBadges.length;
        setTimeout(() => {
          badgeRefs.current[next]?.classList.add('active');
        }, 0);
        return next;
      });
    }, 30000);
    return () => clearInterval(badgeInterval);
  }, [heroBadges.length]);

  // Rotate title/subtitle pairs: flip through all 3 options ONCE, then stop at the last one
  useEffect(() => {
    let flipInterval: NodeJS.Timeout | null = null;
    flipIndexRef.current = 0;

    titleRefs.current[0]?.classList.add('active');
    subtitleRefs.current[0]?.classList.add('active');
    setCurrentIndex(0);

    const flipToNext = () => {
      const currentIdx = flipIndexRef.current;
      if (currentIdx >= heroTitles.length - 1) {
        if (flipInterval) {
          clearInterval(flipInterval);
          flipInterval = null;
        }
        return;
      }

      const nextIdx = currentIdx + 1;
      titleRefs.current[currentIdx]?.classList.remove('active');
      subtitleRefs.current[currentIdx]?.classList.remove('active');
      flipIndexRef.current = nextIdx;
      setCurrentIndex(nextIdx);

      setTimeout(() => {
        titleRefs.current[nextIdx]?.classList.add('active');
        subtitleRefs.current[nextIdx]?.classList.add('active');
      }, 100);
    };

    const startDelay = setTimeout(() => {
      flipInterval = setInterval(flipToNext, 4000);
    }, 1000);

    return () => {
      if (startDelay) clearTimeout(startDelay);
      if (flipInterval) clearInterval(flipInterval);
    };
  }, [heroTitles.length]);

  // Smooth image crossfade - switch every 10 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(imageInterval);
  }, [heroImages.length]);

  return (
    <section ref={heroSectionRef} className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content fade-in">
          <div className="section-badge hero-badge-rotating">
            <span className="hero-badge-sizer" aria-hidden="true">
              {heroBadges.reduce((a, b) => (a.length >= b.length ? a : b))}
            </span>
            {heroBadges.map((badge, index) => (
              <span
                key={index}
                ref={(el) => {
                  badgeRefs.current[index] = el;
                }}
                className={`hero-badge-text ${index === currentBadgeIndex ? 'active' : ''}`}
                data-badge={index}
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="hero-title">
            <span className="hero-title-rotating">
              {heroTitles.map((title, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  className={`hero-title-text ${index === currentIndex ? 'active' : ''}`}
                  data-title={index}
                >
                  {title}
                </span>
              ))}
            </span>
          </h1>
          <div className="hero-subtitle-rotating">
            {heroSubtitles.map((subtitle, index) => (
              <p
                key={index}
                ref={(el) => {
                  subtitleRefs.current[index] = el;
                }}
                className={`hero-subtitle-text ${index === currentIndex ? 'active' : ''}`}
                data-subtitle={index}
              >
                {subtitle}
              </p>
            ))}
          </div>
          <div className="hero-cta-form">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              {t('hero.cta')}
            </button>
          </div>
        </div>
        <div className="hero-visual fade-in">
          <div className="hero-image-container hero-image-stack">
            {heroImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt="SINERGIA NEGOTIUM"
                width={500}
                height={500}
                quality={100}
                unoptimized
                className={`hero-image hero-image-slide ${index === heroImageIndex ? 'active' : ''}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

