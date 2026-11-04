'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Globe, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useSiteUrl } from '@/hooks/use-site-url'
import { computePublishChanges, formatDateTime } from '@/lib/dashboard-utils'
import type { DashboardProfile } from '@/types/dashboard'

interface PortfolioStatusCardProps {
  profile: DashboardProfile | null
  publishSaving: boolean
  onPublishToggle: (next: boolean) => Promise<void>
  onRepublish: () => Promise<void>
}

export function PortfolioStatusCard({
  profile,
  publishSaving,
  onPublishToggle,
  onRepublish,
}: PortfolioStatusCardProps) {
  const siteUrl = useSiteUrl()
  const [copied, setCopied] = useState(false)

  if (!profile) return null

  const isPublished = profile.isPublished !== false
  const username = profile.username || ''
  const portfolioUrl = `${siteUrl}/${username}`
  const changes = computePublishChanges(profile)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl)
      setCopied(true)
      toast.success('Portfolio URL copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy URL')
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Status info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Portfolio Status:
              </span>
              <Badge
                variant={isPublished ? 'default' : 'secondary'}
                className="text-[11px] font-medium"
              >
                {isPublished ? 'Live' : 'Draft'}
              </Badge>
              {profile.theme && (
                <Badge variant="outline" className="text-[11px] text-muted-foreground">
                  Theme: {profile.theme}
                </Badge>
              )}
              {profile.template && (
                <Badge variant="outline" className="text-[11px] text-muted-foreground">
                  Template: {profile.template}
                </Badge>
              )}
            </div>

            {/* URL strip */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-muted/60 border border-border text-xs font-mono text-foreground max-w-full overflow-hidden">
                <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">{portfolioUrl}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
                aria-label="Copy portfolio link"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </>
                )}
              </Button>

              {isPublished && (
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>

            {profile.lastPublishedAt && (
              <p className="text-[11px] text-muted-foreground">
                Last published: {formatDateTime(profile.lastPublishedAt)}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {isPublished ? (
              <>
                {changes.length > 0 && (
                  <Button
                    size="sm"
                    onClick={onRepublish}
                    disabled={publishSaving}
                    className="gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Publish Changes ({changes.length})</span>
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={publishSaving}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Unpublish
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Unpublish Portfolio?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your public portfolio will no longer be visible to visitors. They will see a
                        404 page until you publish again. Your content and settings will remain safe.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onPublishToggle(false)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Unpublish Portfolio
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => onPublishToggle(true)}
                disabled={publishSaving}
              >
                Publish Portfolio
              </Button>
            )}
          </div>
        </div>

        {/* Change details when draft changes exist */}
        {isPublished && changes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-medium text-foreground mb-1.5">
              Unpublished changes:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {changes.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-[4px] bg-muted text-muted-foreground border border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

