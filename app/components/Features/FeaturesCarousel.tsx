'use client';

import { useState, useEffect, useRef } from 'react';
import { useSwipe } from '@/app/hooks/useSwipe';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'auto_graph',
    title: 'AI Investment Management',
    description:
      'Automated, data-driven portfolio growth powered by intelligent algorithms that continuously adapt to changing market conditions.',
  },
  {
    icon: 'track_changes',
    title: 'Real-Time Tracking',
    description:
      'Live performance updates, asset monitoring, and actionable market insights — available anytime, anywhere.',
  },
  {
    icon: 'security',
    title: 'Smart Risk Control',
    description:
      'Adaptive strategies that minimize exposure, detect volatility early, and actively protect capital.',
  },
  {
    icon: 'support_agent',
    title: 'Expert Support',
    description:
      'On-demand assistance through a hybrid support model combining experienced professionals and AI-powered advisors.',
  },
  {
    icon: 'psychology',
    title: 'AI-Powered Intelligence',
    description:
      "TradePAT's proprietary AI continuously scans market data, historical patterns, and trends to generate high-confidence insights — not guesswork.",
  },
  {
    icon: 'auto_awesome',
    title: 'Automated Execution',
    description:
      'From alerts to portfolio adjustments, TradePAT reduces human error while improving speed and efficiency.',
  },
  {
    icon: 'stars',
    title: 'Exclusive & Tailored Experience',
    description:
      'Designed for high-net-worth individuals, professional traders, and elite investors who demand advanced control and performance.',
  },
  {
    icon: 'shield',
    title: 'Security',
    description:
      'Bank-grade encryption, multi-factor authentication, session control, and continuous auditing protect both data and capital.',
  },
  {
    icon: 'public',
    title: 'Scalable & Global Reach',
    description:
      'TradePAT supports local and international markets, scaling effortlessly with user growth and portfolio size.',
  },
];

export default function FeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 640) setCardsPerView(1);
      else if (window.innerWidth <= 968) setCardsPerView(2);
      else if (window.innerWidth <= 1200) setCardsPerView(3);
      else setCardsPerView(4);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, features.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Add swipe functionality
  const swipeRef = useSwipe<HTMLDivElement>({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    threshold: 50,
    preventScroll: true,
  });

  const cardWidth = gridRef.current
    ? (gridRef.current.scrollWidth - (cardsPerView - 1) * 24) / features.length
    : 0;

  const getCardWidth = () => {
    if (!gridRef.current || gridRef.current.children.length === 0) return 0;
    const card = gridRef.current.children[0] as HTMLElement;
    const cardWidth = card.offsetWidth;
    const gridStyle = window.getComputedStyle(gridRef.current);
    const gap = parseFloat(gridStyle.gap) || 32;
    return cardWidth + gap;
  };

  useEffect(() => {
    const updateTransform = () => {
      if (gridRef.current) {
        const cardWidth = getCardWidth();
        const translateX = -currentIndex * cardWidth;
        gridRef.current.style.transform = `translateX(${translateX}px)`;
      }
    };
    updateTransform();
  }, [currentIndex, cardsPerView]);

  return (
    <section className="section" id="features">
      <div className="section-container">
        <div className="section-header fade-in">
          <div className="section-badge">Core Features</div>
          <h2 className="section-title">Everything You Need to Trade with Confidence</h2>
          <p className="section-subtitle">
            TradePAT combines enterprise-grade security, real-time market access, and AI-driven insights to empower your trading decisions.
          </p>
        </div>
        <div className="features-carousel-container">
          <button
            className="features-carousel-nav prev"
            id="featuresPrev"
            onClick={handlePrev}
            aria-label="Previous features"
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <div className="features-carousel-wrapper" ref={swipeRef}>
            <div className="features-grid" id="featuresGrid" ref={gridRef} style={{ transition: 'transform 0.3s ease' }}>
              {features.map((feature, index) => (
                <div key={index} className="feature-card fade-in">
                  <div className="feature-icon">
                    <span className="material-icons">{feature.icon}</span>
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="features-carousel-nav next"
            id="featuresNext"
            onClick={handleNext}
            aria-label="Next features"
          >
            <span className="material-icons">chevron_right</span>
          </button>
          <div className="features-carousel-dots" id="featuresDots">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <div
                key={index}
                className={`features-carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

