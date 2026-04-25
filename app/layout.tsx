import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'EcoParakou - Gestion des déchets à Parakou | Plateforme Citoyenne',
  description: 'Ensemble pour une ville propre et durable. Rejoignez le mouvement citoyen pour transformer notre environnement urbain à Parakou. Signalez les zones polluées et participez aux missions de nettoyage.',
  keywords: ['Parakou', 'déchets', 'environnement', 'écologie', 'Bénin', 'gestion déchets', 'nettoyage urbain', 'bénévolat environnemental'],
  authors: [{ name: 'EcoParakou' }],
  creator: 'EcoParakou',
  publisher: 'EcoParakou',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://ecoparakou.com',
    languages: {
      'fr-BJ': 'https://ecoparakou.com/fr',
      'en-US': 'https://ecoparakou.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_BJ',
    url: 'https://ecoparakou.com',
    siteName: 'EcoParakou',
    title: 'EcoParakou - Gestion des déchets à Parakou',
    description: 'Rejoignez le mouvement citoyen pour une ville propre et durable. Signalez les zones polluées et participez aux missions de nettoyage.',
    images: [
      {
        url: 'https://ecoparakou.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EcoParakou - Plateforme citoyenne',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoParakou - Gestion des déchets à Parakou',
    description: 'Ensemble pour une ville propre et durable',
    images: ['https://ecoparakou.com/twitter-image.jpg'],
    creator: '@EcoParakou',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EcoParakou',
    url: 'https://ecoparakou.com',
    logo: 'https://ecoparakou.com/logo.png',
    description: 'Plateforme citoyenne pour la gestion des déchets et l\'environnement à Parakou',
    sameAs: [
      'https://www.facebook.com/ecoparakou',
      'https://www.twitter.com/ecoparakou',
      'https://www.instagram.com/ecoparakou',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+229-96-000-000',
      email: 'contact@ecoparakou.com',
    },
    location: {
      '@type': 'Place',
      name: 'Parakou',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BJ',
        addressRegion: 'Borgou',
      },
    },
  }

  return (
    <html lang="fr" className="bg-background">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="EcoParakou" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}