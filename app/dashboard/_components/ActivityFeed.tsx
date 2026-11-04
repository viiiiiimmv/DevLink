'use client'

import { Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/dashboard-utils'
import type { ActivityItemData } from '@/types/dashboard'

interface ActivityFeedProps {
  activities: ActivityItemData[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function ActivityFeed({
  activities,
  loading,
  error,
  onRetry,
}: ActivityFeedProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3 flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Recent Activity
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        {loading && activities.length === 0 ? (
          <div className="space-y-3">
            <div className="h-10 rounded-[4px] bg-muted/60 animate-pulse" />
            <div className="h-10 rounded-[4px] bg-muted/60 animate-pulse" />
            <div className="h-10 rounded-[4px] bg-muted/60 animate-pulse" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-between p-3 rounded-[4px] border border-border bg-muted/20 text-xs text-muted-foreground">
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={onRetry} className="h-6 px-2 text-xs">
              Retry
            </Button>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No recent activity recorded yet.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {activities.map((item) => (
              <li
                key={item._id}
                className="flex items-start justify-between gap-3 text-xs p-2 rounded-[4px] bg-muted/20"
              >
                <span className="text-foreground leading-relaxed">
                  {item.message}
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0 pt-0.5 font-mono">
                  {formatRelativeTime(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

