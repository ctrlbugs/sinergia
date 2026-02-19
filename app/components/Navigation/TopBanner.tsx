'use client';

import { useEffect, useState, useRef } from 'react';
import { handleLearnMore } from '@/app/config/constants';

export default function TopBanner() {
  const [showCrypto, setShowCrypto] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer to detect when banner is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the banner is visible
        rootMargin: '0px',
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    // Only run animation when banner is in view
    if (!isInView) {
      return; // Don't start animation if not in view
    }

    const startFlip = () => {
      // Fade out current text
      setIsVisible(false);
      
      // After fade out completes, change text and fade in
      timeoutId = setTimeout(() => {
        setShowCrypto(prev => !prev);
        setIsVisible(true);
      }, 300); // Half of transition duration (600ms / 2)
    };

    // Initial delay, then flip every 8 seconds (only when in view)
    intervalId = setInterval(startFlip, 8000);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView]); // Re-run when visibility changes

  return (
    <div className="top-banner" ref={bannerRef}>
      Earn up to $2,000 when you Trade $200 in{' '}
      <span className="flipping-text">
        <span className={`flipping-text-content ${isVisible ? 'visible' : 'hidden'}`}>
          {showCrypto ? 'crypto¹' : 'stocks²'}
        </span>
      </span>
      {' '}
      <a href="#" onClick={(e) => { e.preventDefault(); handleLearnMore(); }}>Learn more</a>
    </div>
  );
}

