'use client';

import { useEffect, useState, useRef } from 'react';
import { handleSignUp } from '@/app/config/constants';

interface TickerItem {
  name: string;
  symbol: string;
  price: string;
  change: number;
  type: 'crypto' | 'stock';
}

// Static data for symbols (used as fallback and for names)
const tickerSymbols: { symbol: string; name: string; type: 'crypto' | 'stock' }[] = [
  { name: 'Bitcoin', symbol: 'BTC', type: 'crypto' },
  { name: 'Ethereum', symbol: 'ETH', type: 'crypto' },
  { name: 'Cardano', symbol: 'ADA', type: 'crypto' },
  { name: 'Dogecoin', symbol: 'DOGE', type: 'crypto' },
  { name: 'Solana', symbol: 'SOL', type: 'crypto' },
  { name: 'Apple', symbol: 'AAPL', type: 'stock' },
  { name: 'Tesla', symbol: 'TSLA', type: 'stock' },
  { name: 'Microsoft', symbol: 'MSFT', type: 'stock' },
  { name: 'NVIDIA', symbol: 'NVDA', type: 'stock' },
  { name: 'Amazon', symbol: 'AMZN', type: 'stock' },
];

export default function MarketTicker() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [tickerData, setTickerData] = useState<TickerItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFetchRef = useRef<number>(0);

  // Format price for display
  const formatPrice = (price: number): string => {
    if (price < 1) {
      return price.toFixed(price < 0.01 ? 6 : 4);
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Fetch live crypto and stock prices from same API as CryptoList
  const fetchTickerPrices = async () => {
    try {
      const now = Date.now();
      // Prevent too frequent requests (same as CryptoList - every 5 seconds)
      if (now - lastFetchRef.current < 4000) {
        return;
      }

      // Fetch crypto data from the same API endpoint as CryptoList
      const cryptoResponse = await fetch(`/api/crypto?type=crypto&t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });

      const allItems: TickerItem[] = [];

      // Process crypto data (same API as CryptoList uses)
      if (cryptoResponse.ok) {
        const cryptoData = await cryptoResponse.json();
        if (cryptoData.prices && Array.isArray(cryptoData.prices)) {
          cryptoData.prices.forEach((item: any) => {
            const symbolInfo = tickerSymbols.find(s => s.symbol === item.symbol && s.type === 'crypto');
            if (symbolInfo) {
              allItems.push({
                name: symbolInfo.name,
                symbol: item.symbol,
                price: `$${formatPrice(item.price)}`,
                change: item.change24h || 0,
                type: 'crypto',
              });
            }
          });
        }
      }

      // For stocks, use static data matching CryptoList pattern (until stock API is available)
      // These match the same stocks shown in CryptoList component
      const staticStocks: { symbol: string; name: string; price: number; change: number }[] = [
        { name: 'Apple', symbol: 'AAPL', price: 178.42, change: 1.23 },
        { name: 'Tesla', symbol: 'TSLA', price: 248.20, change: -1.2 },
        { name: 'Microsoft', symbol: 'MSFT', price: 378.90, change: 1.5 },
        { name: 'NVIDIA', symbol: 'NVDA', price: 875.23, change: 4.12 },
        { name: 'Amazon', symbol: 'AMZN', price: 154.23, change: 2.14 },
      ];

      // Add stocks to ticker (same data structure as CryptoList uses for stocks)
      staticStocks.forEach((stock) => {
        const symbolInfo = tickerSymbols.find(s => s.symbol === stock.symbol && s.type === 'stock');
        if (symbolInfo) {
          allItems.push({
            name: stock.name,
            symbol: stock.symbol,
            price: `$${formatPrice(stock.price)}`,
            change: stock.change,
            type: 'stock',
          });
        }
      });

      // Update ticker data if we have items
      if (allItems.length > 0) {
        setTickerData(allItems);
        lastFetchRef.current = now;
      } else if (tickerData.length === 0) {
        // Fallback: Use static data if API fails on first load
        const fallbackData: TickerItem[] = tickerSymbols.map((s) => ({
          ...s,
          price: '$0.00',
          change: 0,
        }));
        setTickerData(fallbackData);
      }
    } catch (error) {
      console.error('Error fetching ticker prices:', error);
      // Use fallback data on error if no data exists
      if (tickerData.length === 0) {
        const fallbackData: TickerItem[] = tickerSymbols.map((s) => ({
          ...s,
          price: '$0.00',
          change: 0,
        }));
        setTickerData(fallbackData);
      }
    }
  };

  // Initial fetch and setup refresh interval (every 5 seconds - same as CryptoList)
  useEffect(() => {
    fetchTickerPrices(); // Initial fetch

    const interval = setInterval(() => {
      fetchTickerPrices();
    }, 5000); // Refresh every 5 seconds - same as CryptoList

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Animation effect
  useEffect(() => {
    if (tickerData.length === 0) return;

    const scrollSpeed = 0.5;
    let animationId: number;

    const animate = () => {
      setScrollPosition((prev) => {
        if (containerRef.current) {
          const itemWidth = 200;
          const totalWidth = tickerData.length * itemWidth;
          const newPos = prev + scrollSpeed;
          return newPos >= totalWidth ? 0 : newPos;
        }
        return prev;
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [tickerData]);

  const duplicatedData = tickerData.length > 0 ? [...tickerData, ...tickerData] : [];

  return (
    <section className="market-ticker-section fade-in">
      <div className="section-container">
        <div className="market-ticker-header">
          <div className="market-ticker-subtitle">Market Updates</div>
          <h2 className="market-ticker-title">Live Crypto & Stock Exchange Rates</h2>
          <div className="market-ticker-decoration">
            <div className="market-ticker-line">
              <div className="market-ticker-dot left"></div>
              <div className="market-ticker-dot center"></div>
              <div className="market-ticker-dot right"></div>
            </div>
          </div>
        </div>
        <div className="market-ticker-bar">
          <div className="market-ticker-scroll" id="marketTickerScroll" ref={containerRef}>
            <div className="market-ticker-scroll-wrapper" style={{ transform: `translateX(-${scrollPosition}px)` }}>
              {duplicatedData.map((item, index) => (
                <div key={index} className="market-ticker-item">
                  <span className="market-ticker-symbol">{item.symbol}</span>
                  <span className="market-ticker-price">{item.price}</span>
                  <span className={`market-ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    ({item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button className="market-ticker-button" onClick={handleSignUp}>
            <span className="market-ticker-button-icon material-icons">arrow_forward</span>
            Check Prices
          </button>
        </div>
      </div>
    </section>
  );
}
