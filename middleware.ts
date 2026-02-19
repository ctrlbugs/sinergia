import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle UserAuth clean URL - rewrite /UserAuth to /UserAuth.html
  if (pathname === '/UserAuth') {
    const url = request.nextUrl.clone();
    url.pathname = '/UserAuth.html';
    return NextResponse.rewrite(url);
  }

  // Map of section routes that should render the home page
  const sectionRoutes = ['/features', '/how-it-works', '/security', '/faq'];

  // If the pathname matches a section route, rewrite to home page
  // This allows the URL to stay as /how-it-works but renders the home page
  if (sectionRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/UserAuth',
    '/features',
    '/how-it-works',
    '/security',
    '/faq',
  ],
};

