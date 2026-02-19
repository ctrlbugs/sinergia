'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useLanguage } from '@/app/contexts/LanguageContext';

// Bump this version when you change logo.png to bypass cache
const LOGO_VERSION = 3;

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    // Update URL without reload using pushState
    window.history.pushState(null, '', href);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { href: '/', label: t('nav.home'), sectionId: 'hero' },
    { href: '/about', label: t('nav.about'), sectionId: 'about' },
    { href: '/faq', label: t('nav.faq'), sectionId: 'faq' },
    { href: '/contact', label: t('nav.contact'), sectionId: 'contact' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState(null, '', '/'); }}>
            <Image
              src={`/images/logo.png?v=${LOGO_VERSION}`}
              alt="SINERGIA NEGOTIUM"
              width={36}
              height={36}
              priority
              unoptimized
            />
            <span className="logo-text">SINERGIA NEGOTIUM</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href, link.sectionId)}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions: Search + Language */}
          <div className="nav-actions">
            <div className="nav-search-wrapper">
              <input
                type="search"
                className="nav-search-input"
                placeholder={t('nav.search')}
                aria-label="Search"
              />
              <span className="nav-search-icon" aria-hidden>⌕</span>
            </div>
            <LanguageSelector />
          </div>

          {/* Mobile Actions: Search + Language + Burger */}
          <div className="nav-actions-mobile">
            <div className="nav-search-wrapper nav-search-mobile">
              <input
                type="search"
                className="nav-search-input"
                placeholder={t('nav.search')}
                aria-label="Search"
              />
              <span className="nav-search-icon" aria-hidden>⌕</span>
            </div>
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`burger-menu ${mobileMenuOpen ? 'active' : ''}`}
              id="burgerMenu"
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} id="mobileSidebarOverlay" onClick={() => setMobileMenuOpen(false)}></div>
      
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'active' : ''}`} id="mobileSidebar">
        <div className="mobile-sidebar-header">
          <Link href="/" className="mobile-sidebar-logo" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState(null, '', '/'); }}>
            <Image
              src={`/images/logo.png?v=${LOGO_VERSION}`}
              alt="SINERGIA NEGOTIUM"
              width={32}
              height={32}
              unoptimized
            />
            <span className="logo-text" style={{ fontSize: '1.25rem' }}>SINERGIA NEGOTIUM</span>
          </Link>
          <button
            className="mobile-sidebar-close"
            id="mobileSidebarClose"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <nav className="mobile-sidebar-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-sidebar-social">
          <h4>Follow Us</h4>
          <div className="mobile-social-links">
            <a href="#" className="instagram" aria-label="Instagram" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="twitter" aria-label="X (Twitter)" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="facebook" aria-label="Facebook" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="youtube" aria-label="YouTube" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

