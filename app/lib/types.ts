// Type definitions for landing page

export interface NewsItem {
  title: string;
  excerpt: string;
  time: string;
  category: string;
  image: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CryptoItem {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image?: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

