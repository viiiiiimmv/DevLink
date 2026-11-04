'use client'

import { usePathname } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/layout'

export default function DashboardClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Keep onboarding setup outside the dashboard shell.
  if (pathname?.startsWith('/dashboard/setup')) {
    return <>{children}</>
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

