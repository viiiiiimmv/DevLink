import type { Metadata } from 'next'
import DashboardClientShell from './DashboardClientShell'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
  return <DashboardClientShell>{children}</DashboardClientShell>
}
