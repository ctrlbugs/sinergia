'use client';

import { useState, useEffect, useRef } from 'react';
import { handleSignUp } from '@/app/config/constants';

interface CryptoItem {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
  img: string;
  iconText: string;
}

const cryptos: CryptoItem[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 89065.96, change24h: -1.14, icon: 'btc', img: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400', iconText: '₿' },
  { name: 'Ethereum', symbol: 'ETH', price: 3096.52, change24h: -0.22, icon: 'eth', img: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628', iconText: 'Ξ' },
  { name: 'Tether', symbol: 'USDT', price: 1.00, change24h: 0.00, icon: 'usdt', img: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661', iconText: 'T' },
  { name: 'BNB', symbol: 'BNB', price: 884.58, change24h: -1.25, icon: 'bnb', img: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970', iconText: 'BNB' },
  { name: 'XRP', symbol: 'XRP', price: 1.99, change24h: -1.23, icon: 'xrp', img: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501242', iconText: 'X' },
  { name: 'USDC', symbol: 'USDC', price: 1.00, change24h: 0.00, icon: 'usdc', img: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1696501756', iconText: '$' },
  { name: 'Solana', symbol: 'SOL', price: 192.34, change24h: 2.45, icon: 'sol', img: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756', iconText: 'SOL' },
  { name: 'Cardano', symbol: 'ADA', price: 0.52, change24h: -1.87, icon: 'ada', img: 'https://assets.coingecko.com/coins/images/975/large/Cardano_Logo.png?1696502092', iconText: 'ADA' },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.14, change24h: -2.15, icon: 'doge', img: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409', iconText: 'DOGE' },
  { name: 'Polkadot', symbol: 'DOT', price: 7.23, change24h: 1.32, icon: 'dot', img: 'https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png?1696512162', iconText: 'DOT' },
  { name: 'Avalanche', symbol: 'AVAX', price: 42.18, change24h: -0.95, icon: 'avax', img: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512159', iconText: 'AVAX' },
  { name: 'Chainlink', symbol: 'LINK', price: 18.76, change24h: 2.11, icon: 'link', img: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009', iconText: 'LINK' },
  { name: 'Polygon', symbol: 'MATIC', price: 1.29, change24h: 0.59, icon: 'matic', img: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696501953', iconText: 'MATIC' },
  { name: 'Litecoin', symbol: 'LTC', price: 98.45, change24h: -0.87, icon: 'ltc', img: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501400', iconText: 'LTC' },
  { name: 'Shiba Inu', symbol: 'SHIB', price: 0.000024, change24h: 3.21, icon: 'shib', img: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png?1696511800', iconText: 'SHIB' },
  { name: 'Uniswap', symbol: 'UNI', price: 11.89, change24h: 1.45, icon: 'uni', img: 'https://assets.coingecko.com/coins/images/12504/large/uni.jpg?1696512161', iconText: 'UNI' },
  { name: 'Cosmos', symbol: 'ATOM', price: 10.67, change24h: -0.52, icon: 'atom', img: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525', iconText: 'ATOM' },
  { name: 'Algorand', symbol: 'ALGO', price: 0.23, change24h: 0.89, icon: 'algo', img: 'https://assets.coingecko.com/coins/images/4380/large/download.png?1696501953', iconText: 'ALGO' },
  { name: 'Stellar', symbol: 'XLM', price: 0.13, change24h: -1.25, icon: 'xlm', img: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501562', iconText: 'XLM' },
  { name: 'VeChain', symbol: 'VET', price: 0.045, change24h: 2.34, icon: 'vet', img: 'https://assets.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png?1696501962', iconText: 'VET' },
  { name: 'Theta', symbol: 'THETA', price: 1.89, change24h: -0.98, icon: 'theta', img: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png?1696501962', iconText: 'THETA' },
  { name: 'Filecoin', symbol: 'FIL', price: 6.78, change24h: 1.67, icon: 'fil', img: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1696512162', iconText: 'FIL' },
  { name: 'Hedera', symbol: 'HBAR', price: 0.11, change24h: 0.45, icon: 'hbar', img: 'https://assets.coingecko.com/coins/images/3688/large/hbar.png?1696501962', iconText: 'HBAR' },
  { name: 'Tezos', symbol: 'XTZ', price: 1.05, change24h: -0.23, icon: 'xtz', img: 'https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1696502092', iconText: 'XTZ' },
  { name: 'TRON', symbol: 'TRX', price: 0.12, change24h: 0.89, icon: 'trx', img: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193', iconText: 'TRX' },
];

const stocks: CryptoItem[] = [
  { name: 'Apple', symbol: 'AAPL', price: 178.42, change24h: 1.23, icon: 'aapl', img: 'https://logo.clearbit.com/apple.com', iconText: 'AAPL' },
  { name: 'Microsoft', symbol: 'MSFT', price: 378.91, change24h: 0.87, icon: 'msft', img: 'https://logo.clearbit.com/microsoft.com', iconText: 'MSFT' },
  { name: 'Google', symbol: 'GOOGL', price: 142.56, change24h: -0.52, icon: 'googl', img: 'https://logo.clearbit.com/google.com', iconText: 'G' },
  { name: 'Amazon', symbol: 'AMZN', price: 154.23, change24h: 2.14, icon: 'amzn', img: 'https://logo.clearbit.com/amazon.com', iconText: 'AMZN' },
  { name: 'Tesla', symbol: 'TSLA', price: 248.67, change24h: 3.45, icon: 'tsla', img: 'https://logo.clearbit.com/tesla.com', iconText: 'TSLA' },
  { name: 'Meta', symbol: 'META', price: 485.32, change24h: 1.89, icon: 'meta', img: 'https://logo.clearbit.com/meta.com', iconText: 'M' },
  { name: 'NVIDIA', symbol: 'NVDA', price: 875.23, change24h: 4.12, icon: 'nvda', img: 'https://logo.clearbit.com/nvidia.com', iconText: 'NVDA' },
  { name: 'Netflix', symbol: 'NFLX', price: 542.18, change24h: -0.76, icon: 'nflx', img: 'https://logo.clearbit.com/netflix.com', iconText: 'NFLX' },
  { name: 'AMD', symbol: 'AMD', price: 142.67, change24h: 2.34, icon: 'amd', img: 'https://logo.clearbit.com/amd.com', iconText: 'AMD' },
  { name: 'Intel', symbol: 'INTC', price: 48.92, change24h: -1.15, icon: 'intc', img: 'https://logo.clearbit.com/intel.com', iconText: 'INTC' },
  { name: 'PayPal', symbol: 'PYPL', price: 67.34, change24h: 0.98, icon: 'pypl', img: 'https://logo.clearbit.com/paypal.com', iconText: 'PYPL' },
  { name: 'Adobe', symbol: 'ADBE', price: 542.89, change24h: 1.45, icon: 'adbe', img: 'https://logo.clearbit.com/adobe.com', iconText: 'ADBE' },
  { name: 'Salesforce', symbol: 'CRM', price: 287.45, change24h: -0.67, icon: 'crm', img: 'https://logo.clearbit.com/salesforce.com', iconText: 'CRM' },
  { name: 'Oracle', symbol: 'ORCL', price: 118.76, change24h: 0.45, icon: 'orcl', img: 'https://logo.clearbit.com/oracle.com', iconText: 'ORCL' },
  { name: 'IBM', symbol: 'IBM', price: 178.23, change24h: -0.89, icon: 'ibm', img: 'https://logo.clearbit.com/ibm.com', iconText: 'IBM' },
  { name: 'JPMorgan', symbol: 'JPM', price: 156.78, change24h: 1.23, icon: 'jpm', img: 'https://logo.clearbit.com/jpmorgan.com', iconText: 'JPM' },
  { name: 'Bank of America', symbol: 'BAC', price: 34.56, change24h: 0.67, icon: 'bac', img: 'https://logo.clearbit.com/bankofamerica.com', iconText: 'BAC' },
  { name: 'Visa', symbol: 'V', price: 267.89, change24h: 0.89, icon: 'v', img: 'https://logo.clearbit.com/visa.com', iconText: 'V' },
  { name: 'Mastercard', symbol: 'MA', price: 412.34, change24h: 1.12, icon: 'ma', img: 'https://logo.clearbit.com/mastercard.com', iconText: 'MA' },
  { name: 'Disney', symbol: 'DIS', price: 98.67, change24h: -1.34, icon: 'dis', img: 'https://logo.clearbit.com/disney.com', iconText: 'DIS' },
  { name: 'Coca-Cola', symbol: 'KO', price: 61.23, change24h: 0.45, icon: 'ko', img: 'https://logo.clearbit.com/coca-cola.com', iconText: 'KO' },
  { name: 'PepsiCo', symbol: 'PEP', price: 172.45, change24h: 0.78, icon: 'pep', img: 'https://logo.clearbit.com/pepsico.com', iconText: 'PEP' },
  { name: 'McDonald\'s', symbol: 'MCD', price: 278.92, change24h: 1.56, icon: 'mcd', img: 'https://logo.clearbit.com/mcdonalds.com', iconText: 'MCD' },
  { name: 'Nike', symbol: 'NKE', price: 112.34, change24h: -0.45, icon: 'nke', img: 'https://logo.clearbit.com/nike.com', iconText: 'NKE' },
  { name: 'Home Depot', symbol: 'HD', price: 345.67, change24h: 0.89, icon: 'hd', img: 'https://logo.clearbit.com/homedepot.com', iconText: 'HD' },
];

function CryptoListItem({ item, isPositive, changeIcon, formatPrice }: { item: CryptoItem; isPositive: boolean; changeIcon: string; formatPrice: (price: number) => string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="crypto-list-item">
      <div className={`crypto-list-icon ${item.icon}`}>
        {!imageError ? (
          <img
            src={item.img}
            alt={item.name}
            className="crypto-list-icon-img"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <span>{item.iconText}</span>
        )}
      </div>
      <div className="crypto-list-info">
        <div className="crypto-list-name">{item.name}</div>
        <div className="crypto-list-details">
          <span className="crypto-list-price">${formatPrice(item.price)}</span>
          <span className={`crypto-list-change ${isPositive ? 'positive' : 'negative'}`}>
            <span className="crypto-list-change-icon">{changeIcon}</span>
            {isPositive ? '+' : ''}
            {Math.abs(item.change24h).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CryptoList() {
  const [activeTab, setActiveTab] = useState<'tradable' | 'gainers' | 'losers'>('tradable');
  const [displayItems, setDisplayItems] = useState<CryptoItem[]>([]);
  const [livePrices, setLivePrices] = useState<Record<string, { price: number; change24h: number }>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const lastFetchRef = useRef<number>(0);

  // Fetch live crypto prices every 5 seconds
  const fetchCryptoPrices = async () => {
    try {
      const now = Date.now();
      // Prevent too frequent requests
      if (now - lastFetchRef.current < 4000) {
        return;
      }

      const response = await fetch(`/api/crypto?type=crypto&t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.prices && Array.isArray(data.prices)) {
          // Create a map of symbol to price data
          const priceMap: Record<string, { price: number; change24h: number }> = {};
          data.prices.forEach((item: any) => {
            priceMap[item.symbol] = {
              price: item.price,
              change24h: item.change24h,
            };
          });
          setLivePrices(priceMap);
          setLastUpdated(new Date());
          lastFetchRef.current = now;
        }
      }
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  };

  // Initial fetch and setup refresh interval (every 5 seconds)
  useEffect(() => {
    fetchCryptoPrices(); // Initial fetch

    const interval = setInterval(() => {
      fetchCryptoPrices();
    }, 5000); // Refresh every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Merge live prices with static crypto data
  useEffect(() => {
    const mergedCryptos = cryptos.map((crypto) => {
      const liveData = livePrices[crypto.symbol];
      if (liveData) {
        return {
          ...crypto,
          price: liveData.price,
          change24h: liveData.change24h,
        };
      }
      return crypto;
    });

    let items: CryptoItem[] = [];
    if (activeTab === 'tradable') {
      items = [...mergedCryptos, ...stocks];
    } else if (activeTab === 'gainers') {
      items = [...mergedCryptos, ...stocks]
        .filter((item) => item.change24h > 0)
        .sort((a, b) => b.change24h - a.change24h)
        .slice(0, 25);
    } else {
      items = [...mergedCryptos, ...stocks]
        .filter((item) => item.change24h < 0)
        .sort((a, b) => a.change24h - b.change24h)
        .slice(0, 25);
    }
    setDisplayItems(items);
  }, [activeTab, livePrices]);

  const formatPrice = (price: number) => {
    if (price < 1) {
      return price.toFixed(price < 0.01 ? 6 : 4);
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <section className="crypto-list-section fade-in">
      <div className="crypto-list-container">
        <div className="crypto-list-promo">
          <h2>Explore crypto and stocks like Bitcoin, Ethereum, and top global companies.</h2>
          <p>Track markets, analyze trends, and invest smarter with data-driven insights built for modern investors</p>
          <button className="crypto-list-cta-btn" onClick={handleSignUp}>
            See more assets
          </button>
        </div>
        <div className="crypto-list-card">
          <div className="crypto-list-header-wrapper">
            <div className="crypto-list-tabs">
              <button
                className={`crypto-list-tab ${activeTab === 'tradable' ? 'active' : ''}`}
                onClick={() => setActiveTab('tradable')}
              >
                Tradable
              </button>
              <button
                className={`crypto-list-tab ${activeTab === 'gainers' ? 'active' : ''}`}
                onClick={() => setActiveTab('gainers')}
              >
                Top gainers
              </button>
              <button
                className={`crypto-list-tab ${activeTab === 'losers' ? 'active' : ''}`}
                onClick={() => setActiveTab('losers')}
              >
                Top losers
              </button>
            </div>
            {lastUpdated && (
              <>
                <span className="crypto-list-updated crypto-list-updated-desktop">
                  <span className="crypto-list-updated-text-desktop">Updated {lastUpdated.toLocaleTimeString()}</span>
                </span>
                <div className="crypto-list-updated crypto-list-updated-mobile">
                  <span className="crypto-list-updated-text-mobile">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="crypto-list-items" id="cryptoListItems">
            {displayItems.map((item, index) => {
              const isPositive = item.change24h >= 0;
              const changeIcon = isPositive ? '↑' : '↓';
              
              return (
                <CryptoListItem
                  key={`${item.symbol}-${index}`}
                  item={item}
                  isPositive={isPositive}
                  changeIcon={changeIcon}
                  formatPrice={formatPrice}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
