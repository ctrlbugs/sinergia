'use client';

import { useEffect, useState, Suspense } from 'react';
import Navbar from './components/Navigation/Navbar';
import RouteScrollHandler from './components/RouteScrollHandler';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Stats from './components/Stats/Stats';
import Partners from './components/Partners/Partners';
import HowItWorks from './components/HowItWorks/HowItWorks';
import NewsCarousel from './components/News/NewsCarousel';
import FAQ from './components/FAQ/FAQ';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';

function HomeContent() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Always redirect to UserAuth splash screen first (even on reload)
    // Only show landing page if coming from UserAuth
    // Use window.location directly to avoid hydration issues
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fromUserAuth = params.get('fromUserAuth');
      
      if (!fromUserAuth) {
        // Not coming from UserAuth - redirect to splash screen
        window.location.href = '/UserAuth';
        return;
      }
      
      // Coming from UserAuth - safe to render
      setShouldRender(true);
    }
  }, []);

  // Don't render until we confirm we're coming from UserAuth
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <RouteScrollHandler />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Partners />
      <HowItWorks />
      <NewsCarousel />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
