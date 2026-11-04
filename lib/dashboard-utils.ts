import type { DashboardProfile, DashboardNotificationItem } from '@/types/dashboard'

export function formatDate(input?: string | Date | null): string {
  if (!input) return ''
  const date = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(input?: string | Date | null): string {
  if (!input) return ''
  const date = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function formatRelativeTime(input?: string | Date | null): string {
  if (!input) return ''
  const date = typeof input === 'string' ? new Date(input) : input
  const timestamp = date.getTime()
  if (Number.isNaN(timestamp)) return ''

  const diffMs = timestamp - Date.now()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHours = Math.round(diffMin / 60)
  const diffDays = Math.round(diffHours / 24)

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second')
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute')
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour')
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day')

  return formatDate(date)
}

export function countSocialLinks(socialLinks?: DashboardProfile['socialLinks']): number {
  if (!socialLinks) return 0
  let count = 0
  if (typeof socialLinks.github === 'string' && socialLinks.github.trim()) count += 1
  if (typeof socialLinks.linkedin === 'string' && socialLinks.linkedin.trim()) count += 1
  if (typeof socialLinks.twitter === 'string' && socialLinks.twitter.trim()) count += 1
  if (typeof socialLinks.website === 'string' && socialLinks.website.trim()) count += 1
  return count
}

export function hasProfilePhoto(profile?: DashboardProfile | null): boolean {
  if (!profile) return false
  return Boolean(
    (typeof profile.profilePhoto?.url === 'string' && profile.profilePhoto.url.trim().length > 0) ||
    (typeof profile.profileImage === 'string' && profile.profileImage.trim().length > 0)
  )
}

export function normalizeTagLabel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24)
}

export function computePublishChanges(profile?: DashboardProfile | null): string[] {
  if (!profile?.lastPublishedSnapshot) return []
  const snapshot = profile.lastPublishedSnapshot
  const changes: string[] = []

  const diff = (label: string, current: number, previous?: number) => {
    if (typeof previous !== 'number') return
    const delta = current - previous
    if (delta > 0) changes.push(`Added ${delta} ${label}${delta > 1 ? 's' : ''}`)
    if (delta < 0) changes.push(`Removed ${Math.abs(delta)} ${label}${delta < -1 ? 's' : ''}`)
  }

  diff('project', profile.projects.length, snapshot.projectsCount)
  diff('experience', profile.experiences.length, snapshot.experiencesCount)
  diff('certification', profile.certifications.length, snapshot.certificationsCount)
  diff('research paper', profile.researches.length, snapshot.researchesCount)
  diff('testimonial', profile.testimonials?.length ?? 0, snapshot.testimonialsCount)
  diff('skill', profile.skills.length, snapshot.skillsCount)

  const socialCount = countSocialLinks(profile.socialLinks)
  if (typeof snapshot.socialLinksCount === 'number' && snapshot.socialLinksCount !== socialCount) {
    changes.push('Updated social links')
  }

  if (typeof snapshot.bio === 'string' && snapshot.bio !== profile.bio) {
    changes.push('Updated bio')
  }

  if (snapshot.theme && profile.theme && snapshot.theme !== profile.theme) {
    changes.push(`Theme changed to ${profile.theme}`)
  }

  if (snapshot.template && profile.template && snapshot.template !== profile.template) {
    changes.push(`Template changed to ${profile.template}`)
  }

  return changes
}

export function mergeNotifications(
  sparks: Array<{
    connectionId: string
    peerName?: string
    peerUsername?: string
    createdAt?: string
    updatedAt?: string
  }>,
  conversations: Array<{
    id: string
    peer?: { name?: string; username?: string } | null
    lastMessageText?: string
    lastMessageAt?: string
    unreadCount?: number
  }>
): DashboardNotificationItem[] {
  const items: DashboardNotificationItem[] = []

  for (const spark of sparks) {
    const connectionId = spark.connectionId
    if (!connectionId) continue
    const name = spark.peerName?.trim() || spark.peerUsername || 'A developer'
    items.push({
      id: `spark-${connectionId}`,
      title: `Link Spark from ${name}`,
      description: 'Review request to connect in Talent Network',
      href: '/dashboard/network',
      type: 'spark',
      createdAt: spark.updatedAt || spark.createdAt || new Date().toISOString(),
    })
  }

  for (const conversation of conversations) {
    if (!conversation.id) continue
    const unread = Number(conversation.unreadCount ?? 0)
    if (unread <= 0) continue

    const sender = conversation.peer?.name || conversation.peer?.username || 'A contact'
    const preview = conversation.lastMessageText?.trim() || `${unread} new message${unread > 1 ? 's' : ''}`
    items.push({
      id: `chat-${conversation.id}`,
      title: `${sender} (${unread} unread)`,
      description: preview.length > 80 ? `${preview.slice(0, 80)}...` : preview,
      href: `/dashboard/chats?conversation=${encodeURIComponent(conversation.id)}`,
      type: 'message',
      createdAt: conversation.lastMessageAt || new Date().toISOString(),
    })
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

