'use client'

import { Mail, Archive, Inbox } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InquiryItem } from './InquiryItem'
import type { InquiryItemData, InquirySummary } from '@/types/dashboard'

interface InquiryInboxProps {
  inquiries: InquiryItemData[]
  summary: InquirySummary | null
  loading: boolean
  error: string | null
  showArchived: boolean
  actioningId: string | null
  onToggleArchived: (show: boolean) => void
  onRetry: () => void
  onStatusChange: (id: string, status: 'new' | 'replied') => Promise<void>
  onArchiveToggle: (id: string, currentArchived: boolean) => Promise<void>
  onAddTag: (id: string, tag: string) => Promise<boolean>
  onRemoveTag: (id: string, tag: string) => Promise<boolean>
  onQuickReply: (id: string, template: 'thanks' | 'details' | 'availability') => Promise<boolean>
}

export function InquiryInbox({
  inquiries,
  summary,
  loading,
  error,
  showArchived,
  actioningId,
  onToggleArchived,
  onRetry,
  onStatusChange,
  onArchiveToggle,
  onAddTag,
  onRemoveTag,
  onQuickReply,
}: InquiryInboxProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3 flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
              Inquiry Inbox
            </CardTitle>
            {summary && (
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                <span>New: <strong className="font-mono text-foreground">{summary.new}</strong></span>
                <span>•</span>
                <span>Replied: <strong className="font-mono text-foreground">{summary.replied}</strong></span>
                <span>•</span>
                <span>Archived: <strong className="font-mono text-foreground">{summary.archived}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Active vs Archived filter */}
        <div className="flex items-center rounded-[4px] border border-border bg-muted/30 p-0.5">
          <button
            type="button"
            onClick={() => onToggleArchived(false)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-[3px] transition-colors ${
              !showArchived
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Inbox className="h-3 w-3" />
            <span>Active</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleArchived(true)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-[3px] transition-colors ${
              showArchived
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Archive className="h-3 w-3" />
            <span>Archived</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3">
        {loading && inquiries.length === 0 ? (
          <div className="space-y-3">
            <div className="h-20 rounded-[4px] bg-muted/60 animate-pulse" />
            <div className="h-20 rounded-[4px] bg-muted/60 animate-pulse" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-between p-3 rounded-[4px] border border-border bg-muted/20 text-xs text-muted-foreground">
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={onRetry} className="h-6 px-2 text-xs">
              Retry
            </Button>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-muted-foreground">
              {showArchived ? 'No archived inquiries.' : 'No active inquiries yet.'}
            </p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <InquiryItem
              key={inquiry._id}
              inquiry={inquiry}
              actioning={actioningId === inquiry._id}
              onStatusChange={onStatusChange}
              onArchiveToggle={onArchiveToggle}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
              onQuickReply={onQuickReply}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

