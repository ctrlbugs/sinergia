'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Map routes to section IDs
    const routeToSectionMap: { [key: string]: string } = {
      '/': 'hero',
      '/about': 'about',
      '/faq': 'faq',
      '/contact': 'contact',
    };

    const sectionId = routeToSectionMap[pathname];
    if (sectionId) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (pathname === '/') {
      // Scroll to top when on home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}



