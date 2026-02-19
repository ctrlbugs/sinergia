import { NextResponse } from 'next/server';

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  last_updated: string;
}

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  image: string;
  marketCap: number;
  volume: number;
}

// Map of crypto symbols to CoinGecko IDs
const CRYPTO_ID_MAP: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'USDT': 'tether',
  'BNB': 'binancecoin',
  'XRP': 'ripple',
  'USDC': 'usd-coin',
  'SOL': 'solana',
  'ADA': 'cardano',
  'DOGE': 'dogecoin',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2',
  'LINK': 'chainlink',
  'MATIC': 'matic-network',
  'LTC': 'litecoin',
  'SHIB': 'shiba-inu',
  'UNI': 'uniswap',
  'ATOM': 'cosmos',
  'ALGO': 'algorand',
  'XLM': 'stellar',
  'VET': 'vechain',
  'THETA': 'theta-token',
  'FIL': 'filecoin',
  'HBAR': 'hedera-hashgraph',
  'XTZ': 'tezos',
  'TRX': 'tron'
};


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'crypto'; // 'crypto' or 'stocks'
    
    const backendApiUrl = process.env.BACKEND_API_URL ||
                         (process.env.NODE_ENV === 'production'
                           ? 'https://dashboard.tradepat.com'
                           : 'http://localhost:5000');

    if (type === 'crypto') {
      // Fetch top cryptocurrencies from CoinGecko using prices endpoint (accepts IDs)
      const cryptoIds = Object.values(CRYPTO_ID_MAP).join(',');
      const response = await fetch(`${backendApiUrl}/api/coingecko/prices?ids=${cryptoIds}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform data to match component structure
      // Note: Images are kept from component's hardcoded data, only prices and changes are updated
      const prices: CryptoPrice[] = Object.entries(data).map(([id, priceData]: [string, any]) => {
        // Find symbol from ID map
        const symbol = Object.entries(CRYPTO_ID_MAP).find(([_, coinId]) => coinId === id)?.[0] || id.toUpperCase();
        // Format name from ID
        const name = id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
        
        return {
          id,
          symbol,
          name,
          price: priceData.usd || 0,
          change24h: priceData.usd_24h_change || 0,
          image: '', // Images are handled by component's existing data
          marketCap: priceData.usd_market_cap || 0,
          volume: priceData.usd_24h_vol || 0,
        };
      });

      return NextResponse.json({ prices }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    } else {
      // For stocks, we can fetch from markets endpoint or use a stock API
      // For now, return empty array - stocks can be handled separately
      return NextResponse.json({ prices: [] });
    }
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto prices', prices: [] },
      { status: 500 }
    );
  }
}

