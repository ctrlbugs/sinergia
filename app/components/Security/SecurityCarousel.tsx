'use client';

import { useState, useEffect, useRef } from 'react';
import { useSwipe } from '@/app/hooks/useSwipe';

interface SecurityFeature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: 'lock',
    title: 'Encrypted Transactions',
    description:
      'Your funds and data are protected with enterprise-grade encryption, multi-factor authentication, and continuous monitoring.',
    color: '#10b981',
  },
  {
    icon: 'verified',
    title: 'Multi-Layer Auth',
    description:
      'TradePAT verifies every login and critical action using multiple authentication layers, significantly reducing the risk of account compromise even if one factor is exposed.',
    color: '#3b82f6',
  },
  {
    icon: 'add_moderator',
    title: 'Secure By Design',
    description:
      'From encryption to access control, every layer of TradePAT is engineered to protect your capital and privacy.',
    color: '#f59e0b',
  },
  {
    icon: 'show_chart',
    title: 'Activity Monitoring',
    description:
      'The platform continuously monitors activity patterns and market behavior to detect anomalies early, enabling proactive responses before risks escalate.',
    color: '#8b5cf6',
  },
  {
    icon: 'storage',
    title: 'Cold Storage Protection',
    description:
      'Keeps the majority of digital assets offline, reducing exposure to online threats and attacks.',
    color: '#06b6d4',
  },
  {
    icon: 'gavel',
    title: 'Compliance & Risk Controls',
    description:
      'Built-in security policies, audits, and risk management systems aligned with global financial standards.',
    color: '#ec4899',
  },
];

export default function SecurityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 640) setCardsPerView(1);
      else if (window.innerWidth <= 968) setCardsPerView(2);
      else setCardsPerView(3);
    };

    const calculateCardWidth = () => {
      if (!gridRef.current || securityFeatures.length === 0) {
        setCardWidth(0);
        return;
      }
      const card = gridRef.current.querySelector('.why-card') as HTMLElement;
      if (!card) {
        setCardWidth(0);
        return;
      }
      const width = card.offsetWidth;
      const gridStyle = window.getComputedStyle(gridRef.current);
      const gap = parseFloat(gridStyle.gap) || 32; // 2rem = 32px
      setCardWidth(width + gap);
    };

    updateCardsPerView();
    calculateCardWidth();
    
    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCardsPerView();
        calculateCardWidth();
        setCurrentIndex((prev) => {
          const newMaxIndex = Math.max(0, securityFeatures.length - (window.innerWidth <= 640 ? 1 : window.innerWidth <= 968 ? 2 : 3));
          return prev > newMaxIndex ? newMaxIndex : prev;
        });
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Recalculate after initial render
    setTimeout(calculateCardWidth, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const maxIndex = Math.max(0, securityFeatures.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        // Wrap to last card (infinite loop)
        return maxIndex;
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev < maxIndex) {
        return prev + 1;
      } else {
        // Wrap to first card (infinite loop)
        return 0;
      }
    });
  };

  // Add swipe functionality
  const swipeRef = useSwipe<HTMLDivElement>({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    threshold: 50,
    preventScroll: true,
  });

  return (
    <section className="section" id="why-tradepat">
      <div className="section-container">
        <div className="section-header fade-in" style={{ textAlign: 'center' }}>
          <div className="section-badge">ENTERPRISE SECURITY</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Bank-Level Security for Your Assets
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Your funds and data are protected with enterprise-grade encryption, multi-factor
            authentication, and continuous monitoring.
          </p>
        </div>
        <div className="why-carousel-container">
          <button
            className="why-carousel-nav prev"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <div className="why-carousel-wrapper" ref={swipeRef}>
            <div
              className="why-grid"
              ref={gridRef}
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {securityFeatures.map((feature, index) => (
                <div key={index} className="why-card fade-in">
                  <div className="why-icon" style={{ background: feature.color }}>
                    <span className="material-icons">{feature.icon}</span>
                  </div>
                  <h3 className="why-title">{feature.title}</h3>
                  <p className="why-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="why-carousel-nav next"
            onClick={handleNext}
            aria-label="Next"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
        <div className="why-carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <span
              key={index}
              className={`why-carousel-dot ${index === currentIndex ? 'active' : ''}`}
              data-index={index}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
