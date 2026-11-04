'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { calculateProfileCompletion } from '@/lib/profile-completion'
import type { DashboardProfile } from '@/types/dashboard'

interface ProfileCompletionCardProps {
  profile: DashboardProfile | null
}

export function ProfileCompletionCard({ profile }: ProfileCompletionCardProps) {
  if (!profile) return null

  const completion = calculateProfileCompletion(profile)
  if (completion.percentage >= 100) {
    // Hidden entirely when 100% complete
    return null
  }

  const pendingSteps = completion.steps.filter((s) => !s.completed)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3 flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Profile Completion
          </CardTitle>
        </div>
        <span className="text-xs font-mono font-medium text-foreground">
          {completion.percentage}%
        </span>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Progress bar */}
        <div className="space-y-1.5">
          <Progress
            value={completion.percentage}
            className="h-2 bg-muted"
            aria-label={`Profile completion: ${completion.percentage}%`}
          />
          <p className="text-[11px] text-muted-foreground">
            {completion.completedSteps} of {completion.totalSteps} steps completed ({completion.earnedPoints}/{completion.totalPoints} points)
          </p>
        </div>

        {/* Actionable pending steps */}
        <div className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recommended Steps
          </span>
          <div className="space-y-1.5">
            {pendingSteps.slice(0, 3).map((step) => (
              <Link
                key={step.id}
                href={step.href}
                className="flex items-center justify-between p-2.5 rounded-[4px] border border-border bg-muted/30 hover:bg-muted/60 transition-colors group"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-medium text-foreground truncate">
                    {step.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {step.description}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

