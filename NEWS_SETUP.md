# Trending News Setup Guide

The Trending News component fetches real-time news articles related to cryptocurrency, stocks, finance, and trading. It automatically updates throughout the day with the most recent stories.

## Features

- ✅ **Real-time Updates**: Fetches latest news every hour
- ✅ **Smart Image Matching**: Images automatically match story content based on keywords
- ✅ **Robust Error Handling**: Falls back to curated content if API fails
- ✅ **Caching**: 30-minute cache to avoid rate limits
- ✅ **Content Filtering**: Only shows relevant crypto/finance/trading news
- ✅ **Auto-refresh**: Updates automatically without page reload

## Setup Instructions

### Option 1: Using NewsAPI (Recommended)

1. **Get a free API key** from [NewsAPI.org](https://newsapi.org/)
   - Free tier: 100 requests per day
   - Perfect for development and small sites

2. **Add API key to environment variables**:
   ```bash
   # Create .env.local file in the project root
   NEWS_API_KEY=your_actual_api_key_here
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

### Option 2: Using Without API Key (Fallback Mode)

If you don't set up an API key, the component will:
- Use curated fallback news articles
- Still update timestamps dynamically
- Work perfectly for demos and testing

## How It Works

1. **Fetching**: Component fetches news from `/api/news` endpoint
2. **Caching**: API caches results for 30 minutes to respect rate limits
3. **Filtering**: Only shows articles matching crypto/finance/trading keywords
4. **Image Matching**: Automatically selects appropriate images based on article content:
   - Bitcoin/BTC → Bitcoin-themed image
   - Ethereum/ETH → Ethereum-themed image
   - Stocks/Markets → Stock market image
   - Federal Reserve → Finance/banking image
   - And more...

5. **Auto-refresh**: Updates every hour automatically
6. **Error Handling**: Falls back to curated content if API fails

## Customization

### Change Refresh Interval

Edit `app/components/News/NewsCarousel.tsx`:
```typescript
// Change from 1 hour to 30 minutes
refreshIntervalRef.current = setInterval(() => {
  fetchNews(true);
}, 30 * 60 * 1000); // 30 minutes
```

### Add More Keywords

Edit `app/api/news/route.ts`:
```typescript
const RELEVANT_KEYWORDS = [
  'bitcoin', 'btc', 'ethereum', 'eth',
  // Add your keywords here
  'your-keyword',
];
```

### Customize Image Matching

Edit the `getImageForArticle` function in `app/api/news/route.ts` to add more image matching logic.

## API Endpoints

- `GET /api/news` - Fetches trending news articles
  - Returns: `{ articles: NewsItem[], cached: boolean }`
  - Cached for 30 minutes
  - Automatically filters relevant articles

## Troubleshooting

### News not updating?
- Check browser console for errors
- Verify API key is set correctly
- Check rate limits (100 requests/day for free tier)
- Component will use fallback data if API fails

### Images not loading?
- Images are matched based on article keywords
- Fallback images are provided from Unsplash
- Check network tab for image loading errors

### Rate limit errors?
- Free tier allows 100 requests/day
- Caching reduces API calls significantly
- Consider upgrading to paid tier for production

## Production Considerations

For production use:
1. **Upgrade NewsAPI plan** for higher rate limits
2. **Set up proper caching** (already implemented)
3. **Monitor API usage** to avoid unexpected costs
4. **Consider multiple news sources** for redundancy
5. **Add error monitoring** (Sentry, etc.)

## Alternative News Sources

You can extend the API to support:
- CoinDesk API (crypto-specific)
- CryptoCompare News API
- Alpha Vantage News API
- Custom RSS feeds
- Multiple API aggregation

