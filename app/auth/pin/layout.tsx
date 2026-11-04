import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIN Verification',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

