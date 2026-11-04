'use client'

import { BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/dashboard-utils'
import type { AnalyticsSummary } from '@/types/dashboard'
import type { AnalyticsDays } from '../_hooks/useDashboardAnalytics'

interface AnalyticsCardProps {
  analytics: AnalyticsSummary | null
  loading: boolean
  error: string | null
  days: AnalyticsDays
  onDaysChange: (days: AnalyticsDays) => void
  onRetry: () => void
}

export function AnalyticsCard({
  analytics,
  loading,
  error,
  days,
  onDaysChange,
  onRetry,
}: AnalyticsCardProps) {
  const rangeLabel = analytics?.rangeStart && analytics?.rangeEnd
    ? `${formatDate(analytics.rangeStart)} – ${formatDate(analytics.rangeEnd)}`
    : `Last ${days} days`

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3 flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
              Performance
            </CardTitle>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {rangeLabel}
            </p>
          </div>
        </div>

        {/* Range picker: 7d / 30d / 90d */}
        <div className="flex items-center rounded-[4px] border border-border bg-muted/30 p-0.5">
          {([7, 30, 90] as AnalyticsDays[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDaysChange(d)}
              className={`px-2 py-1 text-[11px] font-medium rounded-[3px] transition-colors ${
                days === d
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {loading && !analytics ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 rounded-[4px] bg-muted/60 animate-pulse" />
              <div className="h-16 rounded-[4px] bg-muted/60 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-24 rounded-[4px] bg-muted/60 animate-pulse" />
              <div className="h-24 rounded-[4px] bg-muted/60 animate-pulse" />
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-between p-3 rounded-[4px] border border-border bg-muted/20 text-xs text-muted-foreground">
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={onRetry} className="h-6 px-2 text-xs">
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Headline metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-[4px] border border-border bg-muted/20">
                <span className="text-xs text-muted-foreground">Total Views</span>
                <p className="text-xl font-semibold font-mono text-foreground mt-1">
                  {analytics?.views ?? 0}
                </p>
              </div>

              <div className="p-3 rounded-[4px] border border-border bg-muted/20">
                <span className="text-xs text-muted-foreground">Unique Visitors</span>
                <p className="text-xl font-semibold font-mono text-foreground mt-1">
                  {analytics?.uniqueVisitors ?? 0}
                </p>
              </div>
            </div>

            {/* Referrers & Projects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Top Referrers */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Top Referrers
                </h3>
                {analytics?.topReferrers && analytics.topReferrers.length > 0 ? (
                  <ul className="space-y-1.5">
                    {analytics.topReferrers.slice(0, 4).map((ref) => (
                      <li
                        key={ref.referrer}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-[4px] bg-muted/30"
                      >
                        <span className="text-foreground truncate max-w-[140px]">
                          {ref.referrer || 'Direct'}
                        </span>
                        <span className="text-muted-foreground font-mono">
                          {ref.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground py-2">
                    No referrers recorded yet.
                  </p>
                )}
              </div>

              {/* Most Clicked Projects */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Project Clicks
                </h3>
                {analytics?.topProjects && analytics.topProjects.length > 0 ? (
                  <ul className="space-y-1.5">
                    {analytics.topProjects.slice(0, 4).map((proj) => (
                      <li
                        key={proj.projectId}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-[4px] bg-muted/30"
                      >
                        <span className="text-foreground truncate max-w-[140px]">
                          {proj.title || 'Untitled Project'}
                        </span>
                        <span className="text-muted-foreground font-mono">
                          {proj.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground py-2">
                    No project clicks recorded yet.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

