'use client';

import { useState, useEffect, useRef } from 'react';
import { useSwipe } from '@/app/hooks/useSwipe';
import { NEWS_ITEMS, type NewsItem } from '@/app/lib/newsData';

function getTimeAgo(publishedAt: string): string {
  const diffMs = Date.now() - new Date(publishedAt).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function NewsCarousel() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Use static news data
  useEffect(() => {
    setNewsData(
      NEWS_ITEMS.map((item) => ({
        ...item,
        time: getTimeAgo(item.publishedAt),
      }))
    );
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    const calculateCardWidth = () => {
      if (!gridRef.current || newsData.length === 0) {
        setCardWidth(0);
        return;
      }
      const wrapper = gridRef.current.parentElement as HTMLElement;
      if (!wrapper) return;
      const wrapperWidth = wrapper.offsetWidth;
      const gap = cardsPerView === 1 ? 0 : 24;
      setCardWidth((wrapperWidth - (cardsPerView - 1) * gap) / cardsPerView);
    };

    updateCardsPerView();
    const t = setTimeout(calculateCardWidth, 100);
    window.addEventListener('resize', () => {
      updateCardsPerView();
      setTimeout(calculateCardWidth, 100);
    });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateCardsPerView);
    };
  }, [cardsPerView, newsData]);

  const maxIndex = Math.max(0, newsData.length - cardsPerView);
  const gap = cardsPerView === 1 ? 0 : 24;
  const translateX = currentSlide * (cardWidth + gap);

  const handlePrev = () =>
    setCurrentSlide((p) => (p > 0 ? p - 1 : maxIndex));
  const handleNext = () =>
    setCurrentSlide((p) => (p < maxIndex ? p + 1 : 0));

  const handleReadMore = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  // Lock body scroll and handle Escape when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  const swipeRef = useSwipe<HTMLDivElement>({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    threshold: 50,
    preventScroll: true,
  });

  return (
    <section className="trending-news-section fade-in">
      <div className="section-container">
        <div className="trending-news-header">
          <div className="trending-news-title-wrapper">
            <span className="material-icons trending-icon">trending_up</span>
            <h2 className="trending-news-title">Trending News</h2>
            {newsData.length > 0 && (
              <span className="trending-news-updated" style={{ marginLeft: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {newsData.length} articles
              </span>
            )}
          </div>
          <div className="trending-news-badge">HOT</div>
        </div>

        <div className="trending-news-carousel-container">
          <button
            className="news-carousel-nav prev"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <span className="material-icons">chevron_left</span>
          </button>

          <div className="trending-news-carousel-wrapper" ref={swipeRef}>
            <div
              className="trending-news-grid"
              ref={gridRef}
              style={{
                transform: `translateX(-${translateX}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {newsData.map((news, index) => (
                <div
                  key={news.id}
                  className="news-card news-card-fade-in"
                  style={{
                    width:
                      cardsPerView === 1
                        ? '100%'
                        : cardWidth > 0
                        ? `${cardWidth}px`
                        : 'auto',
                    maxWidth: cardsPerView === 1 ? '100%' : 'none',
                  }}
                >
                  <div className="news-card-image-wrapper">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="news-card-image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement?.classList.add('image-error');
                      }}
                    />
                  </div>
                  <div className="news-card-content">
                    <div className="news-card-header">
                      <div className="news-card-badges">
                        <span className="news-badge news">
                          {news.category}
                        </span>
                        {index < 2 && (
                          <span className="news-badge hot">
                            <span className="material-icons">local_fire_department</span>
                            HOT
                          </span>
                        )}
                      </div>
                      <span className="news-time">{news.time}</span>
                    </div>
                    <h3 className="news-card-title">{news.title}</h3>
                    <p className="news-card-excerpt">{news.excerpt}</p>
                    <div className="news-card-footer">
                      <button
                        onClick={() => handleReadMore(news)}
                        className="news-read-more-btn"
                      >
                        Read More
                        <span className="material-icons">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="news-carousel-nav next"
            onClick={handleNext}
            aria-label="Next"
          >
            <span className="material-icons">chevron_right</span>
          </button>

          {newsData.length > 0 && (
            <div className="news-carousel-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <span
                  key={i}
                  className={`news-carousel-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* News Detail Modal */}
      {isModalOpen && selectedNews && (
        <div
          className="news-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
        >
          <div
            className="news-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="news-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              <span className="material-icons">close</span>
            </button>
            <div className="news-modal-image-wrapper">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="news-modal-image"
              />
              <span className="news-modal-badge">{selectedNews.category}</span>
            </div>
            <div className="news-modal-content">
              <h2 id="news-modal-title" className="news-modal-title">
                {selectedNews.title}
              </h2>
              <p className="news-modal-meta">
                {selectedNews.source} · {selectedNews.time}
              </p>
              <p className="news-modal-summary">{selectedNews.summary}</p>
              <a
                href={selectedNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-modal-link"
              >
                Read full article at {selectedNews.source}
                <span className="material-icons">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
