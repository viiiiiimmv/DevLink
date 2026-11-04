import type { Metadata } from 'next'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Sign In',
  description: `Sign in to ${SITE_NAME} to manage your developer portfolio and connect with other developers.`,
  alternates: {
    canonical: absoluteUrl('/auth/signin'),
  },
  openGraph: {
    title: `Sign In — ${SITE_NAME}`,
    description: `Sign in to ${SITE_NAME} to manage your developer portfolio and connect with other developers.`,
    url: absoluteUrl('/auth/signin'),
    siteName: SITE_NAME,
    type: 'website',
  },
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

