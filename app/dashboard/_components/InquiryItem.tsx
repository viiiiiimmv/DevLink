'use client'

import { useState } from 'react'
import {
  Mail,
  Send,
  Tag as TagIcon,
  Archive,
  ArchiveRestore,
  CheckCircle,
  Clock,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { formatRelativeTime } from '@/lib/dashboard-utils'
import type { InquiryItemData } from '@/types/dashboard'

interface InquiryItemProps {
  inquiry: InquiryItemData
  actioning: boolean
  onStatusChange: (id: string, status: 'new' | 'replied') => Promise<void>
  onArchiveToggle: (id: string, currentArchived: boolean) => Promise<void>
  onAddTag: (id: string, tag: string) => Promise<boolean>
  onRemoveTag: (id: string, tag: string) => Promise<boolean>
  onQuickReply: (id: string, template: 'thanks' | 'details' | 'availability') => Promise<boolean>
}

const TEMPLATE_COPIES = {
  thanks: {
    label: 'Thank you',
    text: 'Thank you for reaching out! I appreciate your message and will follow up with you shortly.',
  },
  details: {
    label: 'Ask details',
    text: 'Thank you for getting in touch. Could you please share a few more details about your timeline and project scope?',
  },
  availability: {
    label: 'Share availability',
    text: 'Thank you for your interest. I am currently available for new opportunities and would love to schedule a quick call to discuss.',
  },
}

export function InquiryItem({
  inquiry,
  actioning,
  onStatusChange,
  onArchiveToggle,
  onAddTag,
  onRemoveTag,
  onQuickReply,
}: InquiryItemProps) {
  const [expanded, setExpanded] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [activeTemplate, setActiveTemplate] = useState<'thanks' | 'details' | 'availability' | null>(null)

  const handleAddTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tagInput.trim()) return
    const success = await onAddTag(inquiry._id, tagInput)
    if (success) {
      setTagInput('')
    }
  }

  const handleConfirmReply = async () => {
    if (!activeTemplate) return
    const t = activeTemplate
    setActiveTemplate(null)
    await onQuickReply(inquiry._id, t)
  }

  return (
    <div className="rounded-[4px] border border-border bg-card p-3.5 transition-colors">
      {/* Primary header row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {inquiry.name}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              &lt;{inquiry.email}&gt;
            </span>
            <Badge
              variant={inquiry.status === 'new' ? 'default' : 'secondary'}
              className="text-[10px] h-4 px-1.5"
            >
              {inquiry.status}
            </Badge>
            {inquiry.archived && (
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 text-muted-foreground">
                Archived
              </Badge>
            )}
          </div>

          {/* Message snippet: truncated with line-clamp-2 when not expanded */}
          <p
            className={`text-xs text-muted-foreground leading-relaxed ${
              expanded ? 'whitespace-pre-wrap' : 'line-clamp-2'
            }`}
          >
            {inquiry.message}
          </p>
        </div>

        {/* Action buttons & overflow menu */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
          <span className="text-[10px] text-muted-foreground mr-1">
            {formatRelativeTime(inquiry.createdAt)}
          </span>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse inquiry details' : 'Expand inquiry details'}
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                aria-label="More actions"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  onStatusChange(inquiry._id, inquiry.status === 'new' ? 'replied' : 'new')
                }
                disabled={actioning}
              >
                {inquiry.status === 'new' ? (
                  <>
                    <CheckCircle className="mr-2 h-3.5 w-3.5" />
                    Mark as Replied
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-3.5 w-3.5" />
                    Mark as New
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onArchiveToggle(inquiry._id, Boolean(inquiry.archived))}
                disabled={actioning}
              >
                {inquiry.archived ? (
                  <>
                    <ArchiveRestore className="mr-2 h-3.5 w-3.5" />
                    Restore Inquiry
                  </>
                ) : (
                  <>
                    <Archive className="mr-2 h-3.5 w-3.5" />
                    Archive Inquiry
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Expanded details row: tags & quick replies */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-3">
          {/* Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Tags
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {inquiry.tags && inquiry.tags.length > 0 ? (
                inquiry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-[3px] bg-muted text-muted-foreground border border-border"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveTag(inquiry._id, tag)}
                      disabled={actioning}
                      className="hover:text-destructive"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-muted-foreground">No tags</span>
              )}

              {/* Add tag form */}
              <form onSubmit={handleAddTagSubmit} className="inline-flex items-center gap-1">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="new-tag"
                  className="h-6 w-24 text-[11px] px-1.5"
                  disabled={actioning}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  disabled={actioning || !tagInput.trim()}
                  className="h-6 px-1.5 text-[11px]"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Replies with confirmation */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Send Quick Reply
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {(['thanks', 'details', 'availability'] as const).map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  disabled={actioning}
                  onClick={() => setActiveTemplate(key)}
                  className="h-7 text-xs gap-1.5"
                >
                  <Send className="h-3 w-3 text-muted-foreground" />
                  <span>{TEMPLATE_COPIES[key].label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Quick Reply */}
      <AlertDialog
        open={activeTemplate !== null}
        onOpenChange={(open) => {
          if (!open) setActiveTemplate(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Send Quick Reply to {inquiry.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The following email will be dispatched to &lt;{inquiry.email}&gt;:
            </AlertDialogDescription>
          </AlertDialogHeader>

          {activeTemplate && (
            <div className="p-3 rounded-[4px] bg-muted/60 border border-border text-xs text-foreground font-mono whitespace-pre-wrap">
              {TEMPLATE_COPIES[activeTemplate].text}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmReply}>
              Confirm and Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

