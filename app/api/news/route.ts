import { NextResponse } from 'next/server';
import { NEWS_ITEMS } from '@/app/lib/newsData';

function getTimeAgo(publishedAt: string): string {
  const diffMs = Date.now() - new Date(publishedAt).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export async function GET() {
  const articles = NEWS_ITEMS.map((item) => ({
    title: item.title,
    excerpt: item.excerpt,
    summary: item.summary,
    time: getTimeAgo(item.publishedAt),
    category: item.category,
    image: item.image,
    url: item.url,
    source: item.source,
    publishedAt: item.publishedAt,
  }));

  return NextResponse.json({
    articles,
    count: articles.length,
    timestamp: new Date().toISOString(),
  });
}
