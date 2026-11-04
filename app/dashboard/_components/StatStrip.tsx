'use client'

import Link from 'next/link'
import {
  FolderGit2,
  Briefcase,
  Award,
  BookOpen,
  MessageSquareQuote,
  Plus,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { DashboardProfile } from '@/types/dashboard'

interface StatStripProps {
  profile: DashboardProfile | null
}

export function StatStrip({ profile }: StatStripProps) {
  if (!profile) return null

  const items = [
    {
      label: 'Projects',
      count: profile.projects?.length ?? 0,
      href: '/dashboard/projects',
      icon: FolderGit2,
    },
    {
      label: 'Experiences',
      count: profile.experiences?.length ?? 0,
      href: '/dashboard/experience',
      icon: Briefcase,
    },
    {
      label: 'Certifications',
      count: profile.certifications?.length ?? 0,
      href: '/dashboard/certifications',
      icon: Award,
    },
    {
      label: 'Research Papers',
      count: profile.researches?.length ?? 0,
      href: '/dashboard/researches',
      icon: BookOpen,
    },
    {
      label: 'Testimonials',
      count: profile.testimonials?.length ?? 0,
      href: '/dashboard/testimonials',
      icon: MessageSquareQuote,
    },
  ]

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Portfolio Content
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group block rounded-[4px] border border-border bg-card p-3.5 hover:border-border/80 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-semibold font-mono text-foreground">
                  {item.count}
                </span>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground flex items-center gap-0.5 transition-colors">
                  <Plus className="h-2.5 w-2.5" />
                  Manage
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

