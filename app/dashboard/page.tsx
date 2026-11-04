'use client'

import { useSession } from 'next-auth/react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useDashboardProfile } from './_hooks/useDashboardProfile'
import { useDashboardAnalytics } from './_hooks/useDashboardAnalytics'
import { useInquiries } from './_hooks/useInquiries'
import { useDashboardNotifications } from './_hooks/useDashboardNotifications'
import { useActivity } from './_hooks/useActivity'
import { DashboardHeader } from './_components/DashboardHeader'
import { PortfolioStatusCard } from './_components/PortfolioStatusCard'
import { AttentionPanel } from './_components/AttentionPanel'
import { AnalyticsCard } from './_components/AnalyticsCard'
import { InquiryInbox } from './_components/InquiryInbox'
import { ProfileCompletionCard } from './_components/ProfileCompletionCard'
import { ActivityFeed } from './_components/ActivityFeed'
import { StatStrip } from './_components/StatStrip'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const prefersReducedMotion = useReducedMotion()

  const {
    profile,
    loading: profileLoading,
    error: profileError,
    publishSaving,
    fetchProfile,
    setPublishState,
    republishChanges,
  } = useDashboardProfile()

  const {
    activities,
    loading: activityLoading,
    error: activityError,
    retry: retryActivity,
  } = useActivity(8)

  const {
    days,
    setDays,
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    retry: retryAnalytics,
  } = useDashboardAnalytics(30)

  const {
    inquiries,
    summary: inquirySummary,
    loading: inquiryLoading,
    error: inquiryError,
    showArchived,
    setShowArchived,
    actioningId,
    retry: retryInquiries,
    handleStatusChange,
    handleArchiveToggle,
    handleAddTag,
    handleRemoveTag,
    handleQuickReply,
  } = useInquiries(retryActivity)

  const {
    notifications,
    pendingSparksCount,
    unreadChatsCount,
    loading: notifLoading,
    error: notifError,
    retry: retryNotifications,
  } = useDashboardNotifications(session?.user?.id)

  if (profileLoading || status === 'loading') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground"
          role="status"
          aria-label="Loading dashboard"
        />
      </div>
    )
  }

  if (profileError && !profile) {
    return (
      <div className="rounded-[4px] border border-border bg-card p-8 text-center space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Unable to load dashboard
        </h2>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          {profileError}
        </p>
        <Button size="sm" onClick={fetchProfile}>
          Retry
        </Button>
      </div>
    )
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25, ease: 'easeOut' as const },
      }

  const displayName = profile?.name || session?.user?.name || undefined

  return (
    <motion.div {...motionProps} className="space-y-6">
      {/* 1. Dashboard Header */}
      <DashboardHeader
        name={displayName}
        username={profile?.username}
      />

      {/* 2. Portfolio Status (moved to the top) */}
      <PortfolioStatusCard
        profile={profile}
        publishSaving={publishSaving}
        onPublishToggle={setPublishState}
        onRepublish={republishChanges}
      />

      {/* 3. Performance & Needs Attention Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttentionPanel
          pendingSparksCount={pendingSparksCount}
          unreadChatsCount={unreadChatsCount}
          newInquiriesCount={inquirySummary?.new ?? 0}
          notifications={notifications}
          loading={notifLoading}
          error={notifError}
          onRetry={retryNotifications}
        />

        <AnalyticsCard
          analytics={analytics}
          loading={analyticsLoading}
          error={analyticsError}
          days={days}
          onDaysChange={setDays}
          onRetry={retryAnalytics}
        />
      </div>

      {/* 4. Two-Column Layout: Inquiries & Content on Left, Completion & Activity on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <InquiryInbox
            inquiries={inquiries}
            summary={inquirySummary}
            loading={inquiryLoading}
            error={inquiryError}
            showArchived={showArchived}
            actioningId={actioningId}
            onToggleArchived={setShowArchived}
            onRetry={retryInquiries}
            onStatusChange={handleStatusChange}
            onArchiveToggle={handleArchiveToggle}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onQuickReply={handleQuickReply}
          />

          <StatStrip profile={profile} />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <ProfileCompletionCard profile={profile} />
          <ActivityFeed
            activities={activities}
            loading={activityLoading}
            error={activityError}
            onRetry={retryActivity}
          />
        </div>
      </div>
    </motion.div>
  )
}
