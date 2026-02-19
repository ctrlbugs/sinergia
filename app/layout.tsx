import type { Metadata } from "next";
import "./globals.css";
import FadeInObserver from "./components/FadeInObserver";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Transforming Procurement Through Digital Excellence",
  description: "Sinergia Negotium Limited is driving procurement transformation through the design and implementation of a modern e-procurement portal.",
  keywords: ["E-Procurement Portal", "Digital Procurement", "Procurement Digitization", "Public Procurement System", "Electronic Tendering", "Digital Governance", "Procurement Compliance"],
  authors: [{ name: "SINERGIA" }],
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
    shortcut: '/images/favicon.png',
  },
  openGraph: {
    title: "TradePAT - AI-Powered Trading Platform",
    description: "Protection. Access. Trust. Trade securely with AI-powered intelligence.",
    type: "website",
    url: "https://sinergianegotium.com",
    siteName: "TradePAT",
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Sinergia Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TradePAT - AI-Powered Trading Platform",
    description: "Protection. Access. Trust. Trade securely with AI-powered intelligence.",
    images: ['/images/securepat-icon.png'],
  },
  metadataBase: new URL('https://sinergianegotium.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons - same as UserAuth for consistency */}
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <link rel="shortcut icon" href="/images/favicon.png" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        
        {/* Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TradePAT",
              "url": "https://www.tradepat.com",
              "logo": "https://www.tradepat.com/images/securepat-icon.png",
              "description": "TradePAT is an AI-powered investment management platform that combines advanced analytics, real-time market intelligence, and automated decision support to help investors grow, manage, and protect their wealth.",
              "sameAs": [
                "https://www.tradepat.com"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://www.tradepat.com"
              }
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <FadeInObserver />
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
