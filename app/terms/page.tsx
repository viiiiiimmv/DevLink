import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { TERMS_AND_CONDITIONS } from '@/lib/legal-content'

export const metadata: Metadata = {
  title: 'Terms & Conditions — DevLink',
  description:
    'Review the Terms & Conditions governing access, user conduct, intellectual property, and acceptable use on the DevLink platform.',
}

export default function TermsPage() {
  return <LegalLayout doc={TERMS_AND_CONDITIONS} currentPath="/terms" />
}

