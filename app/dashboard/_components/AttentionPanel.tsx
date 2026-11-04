'use client'

import Link from 'next/link'
import { UsersRound, MessageSquare, Mail, Bell, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/dashboard-utils'
import type { DashboardNotificationItem } from '@/types/dashboard'

interface AttentionPanelProps {
  pendingSparksCount: number
  unreadChatsCount: number
  newInquiriesCount: number
  notifications: DashboardNotificationItem[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function AttentionPanel({
  pendingSparksCount,
  unreadChatsCount,
  newInquiriesCount,
  notifications,
  loading,
  error,
  onRetry,
}: AttentionPanelProps) {
  const totalAttention = pendingSparksCount + unreadChatsCount + newInquiriesCount

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3 flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Needs Attention
          </CardTitle>
          {totalAttention > 0 && (
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-mono">
              {totalAttention}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Quick KPI badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <Link
            href="/dashboard/network"
            className="flex items-center justify-between p-2.5 rounded-[4px] border border-border bg-muted/40 hover:bg-muted transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <UsersRound className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Pending Sparks</span>
            </div>
            <span className="font-semibold text-foreground font-mono">
              {pendingSparksCount}
            </span>
          </Link>

          <Link
            href="/dashboard/chats"
            className="flex items-center justify-between p-2.5 rounded-[4px] border border-border bg-muted/40 hover:bg-muted transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Unread Chats</span>
            </div>
            <span className="font-semibold text-foreground font-mono">
              {unreadChatsCount}
            </span>
          </Link>

          <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-border bg-muted/40 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">New Inquiries</span>
            </div>
            <span className="font-semibold text-foreground font-mono">
              {newInquiriesCount}
            </span>
          </div>
        </div>

        {/* Live notification items */}
        <div aria-live="polite" className="space-y-2 pt-1">
          {loading && notifications.length === 0 ? (
            <div className="space-y-2">
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
          ) : notifications.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              All caught up. No pending requests or unread messages.
            </p>
          ) : (
            notifications.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-start justify-between gap-3 p-2.5 rounded-[4px] border border-border bg-card hover:bg-muted/40 transition-colors group"
              >
                <div className="min-w-0 space-y-0.5">
                  <p className="text-xs font-medium text-foreground truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <span className="text-[10px] text-muted-foreground">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

