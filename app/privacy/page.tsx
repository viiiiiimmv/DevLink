import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { PRIVACY_POLICY } from '@/lib/legal-content'

export const metadata: Metadata = {
  title: 'Privacy Policy — DevLink',
  description:
    'Read DevLink’s Privacy Policy explaining our data collection, itemised notices, lawful basis of consent, and your statutory data principal rights.',
}

export default function PrivacyPage() {
  return <LegalLayout doc={PRIVACY_POLICY} currentPath="/privacy" />
}

