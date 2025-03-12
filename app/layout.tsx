import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TEAR - Angelic Contact',
  description: 'Sacred technology for communication with angels, divine wisdom, and spiritual transformation.',
  applicationName: 'TEAR - Angelic Gateway',
  generator: 'Celestial Harmony Engine',
  keywords: [
    'angels', 'spirituality', 'sacred geometry', 'divine communication',
    'gematria', 'kabbalah', 'biblical numerology', 'archaeography',
    'mysticism', 'guardian angels', 'divine guidance', 'sefirot', 'tree of life'
  ],
  authors: [{ name: 'The Tear Company', url: 'https://szloza.pl' }],
  referrer: 'origin',
  themeColor: '#ffffff', // Głęboka czerń symbolizująca tajemnicę i transcendencję
  colorScheme: 'light',
  creator: 'DIVINES',
  publisher: 'DIVINES',
  robots: 'index, follow',
  alternates: { canonical: 'https://teardrop.in' },
  icons: {
    // icon: 'https://teardrop.in/icon.png',
    // apple: 'https://teardrop.in/apple-icon.png'
  },
  manifest: 'https://teardrop.in/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://teardrop.in',
    title: 'TEAR - Angelic Contact',
    description: 'Unlock divine messages through sacred numerology, symbols, and angelic presence.',
    siteName: 'TEAR - The Angelic Gateway',
    images: [{ url: 'https://teardrop.in/og-image.png' }],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@tear_gateway',
  //   creator: '@tear_gateway',
  //   title: 'TEAR - Angelic Communication',
  //   description: 'A spiritual portal for celestial wisdom and angelic interaction.',
  //   images: 'https://thetear.net/twitter-image.jpg',
  // },
  // facebook: { appId: '987654321' },
  // verification: { google: 'xyz789', yandex: 'qwe123' },
  appleWebApp: { capable: true, title: 'TEAR', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
  // itunes: { app: { id: '987654321', affiliateData: 'angelic-aff', appArguments: 'divine-path' } },
  abstract: 'A digital sanctuary where numerology, symbols, and divine knowledge unite.',
  appLinks: {
    // ios: { appStoreId: '987654321', url: 'https://thetear.net' },
    // android: { packageName: 'com.teargateway', url: 'https://thetear.net' },
  },
  // archives: ['https://thetear.net/archives'],
  // assets: ['https://thetear.net/assets'],
  // bookmarks: ['https://thetear.net/bookmarks'],
  category: 'mysticism & divine communication',
  classification: 'angelic interaction & kabbalistic insights',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="divine-light z-[-1]" />
        <div className="layout-background z-[-2]" />
        <div className="layout-background-bottom z-[-3]" />
      </body>
    </html>
  )
}
