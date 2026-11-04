'use client'

import Link from 'next/link'
import { Eye, ExternalLink, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardHeaderProps {
  name?: string
  username?: string
}

export function DashboardHeader({ name, username }: DashboardHeaderProps) {
  const greeting = name?.trim() ? `Welcome back, ${name.trim()}` : null

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        {greeting && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {greeting}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {username ? (
          <Button asChild variant="secondary" size="sm">
            <a
              href={`/${encodeURIComponent(username)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <Eye className="h-4 w-4" />
              <span>View Portfolio</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          </Button>
        ) : (
          <Button variant="secondary" size="sm" disabled className="opacity-50">
            <Eye className="h-4 w-4 mr-1.5" />
            <span>View Portfolio</span>
          </Button>
        )}

        <Button asChild size="sm">
          <Link href="/dashboard/profile" className="inline-flex items-center gap-1.5">
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

