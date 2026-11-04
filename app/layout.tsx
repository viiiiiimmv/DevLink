import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { AuthProvider } from '@/components/providers/auth-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'
import { absoluteUrl, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'DevLink — Create a public developer portfolio from your GitHub repositories',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'developer portfolio',
    'github portfolio generator',
    'software engineer portfolio',
    'developer showcase',
    'tech resume portfolio',
    'developer networking',
    'open source portfolio',
    'code circle',
    'portfolio builder',
  ],
  authors: [{ name: `${SITE_NAME} Team` }],
  alternates: {
    canonical: absoluteUrl('/'),
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'DevLink — Create a public developer portfolio from your GitHub repositories',
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Developer Portfolio Builder`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevLink — Create a public developer portfolio from your GitHub repositories',
    description: SITE_DESCRIPTION,
    images: [absoluteUrl('/opengraph-image')],
    creator: '@devlink',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FH2KRX9EYH" />
        <Script id="google-tag-g-fh2krx9eyh">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-FH2KRX9EYH');`}
        </Script>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
