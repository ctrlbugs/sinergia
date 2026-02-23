import type { Metadata } from "next";
import "./globals.css";
import FadeInObserver from "./components/FadeInObserver";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ContactModalProvider } from "./components/ContactModal/ContactModal";

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
    title: "Transforming Procurement Through Digital Excellence",
    description: "Sinergia Negotium Limited is driving procurement transformation through the design and implementation of a modern e-procurement portal",
    type: "website",
    url: "https://sinergianegotium.com",
    siteName: "Sinergia Negotium",
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
    title: "Transforming Procurement Through Digital Excellence",
    description: "Sinergia Negotium Limited is driving procurement transformation through the design and implementation of a modern e-procurement portal",
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
              "name": "Sinergia Negotium",
              "url": "https://www.sinergianegotium.com",
              "logo": "https://www.sinergianegotium.com/images/securepat-icon.png",
              "description": "Sinergia Negotium is an AI-powered investment management platform that combines advanced analytics, real-time market intelligence, and automated decision support to help investors grow, manage, and protect their wealth.",
              "sameAs": [
                "https://www.sinergianegotium.com"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://www.sinergianegotium.com"
              }
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <ContactModalProvider>
            <FadeInObserver />
            {children}
            <ScrollToTop />
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
