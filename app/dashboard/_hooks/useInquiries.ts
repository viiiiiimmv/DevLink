'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'
import type { InquiryItemData, InquirySummary } from '@/types/dashboard'
import { normalizeTagLabel } from '@/lib/dashboard-utils'

export function useInquiries(onActivityTrigger?: () => void) {
  const [inquiries, setInquiries] = useState<InquiryItemData[]>([])
  const [summary, setSummary] = useState<InquirySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showArchived, setShowArchived] = useState(false)
  const [actioningId, setActioningId] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchInquiries = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const url = showArchived
        ? '/api/inquiries?archived=true&limit=10'
        : '/api/inquiries?limit=10'

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      })

      if (!res.ok) {
        throw new Error('Failed to load inquiries.')
      }

      const data = await res.json()
      setInquiries(Array.isArray(data?.inquiries) ? data.inquiries : [])
      setSummary(data?.summary || null)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : 'Unable to load inquiries.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [showArchived])

  useEffect(() => {
    fetchInquiries()
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchInquiries])

  const patchInquiry = useCallback(
    async (id: string, payload: Record<string, unknown>, successMsg?: string) => {
      setActioningId(id)
      try {
        const res = await fetch(`/api/inquiries/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error || 'Failed to update inquiry.')
        }

        if (successMsg) {
          toast.success(successMsg)
        }
        await fetchInquiries()
        return true
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update inquiry.'
        toast.error(msg)
        return false
      } finally {
        setActioningId(null)
      }
    },
    [fetchInquiries]
  )

  const handleStatusChange = useCallback(
    async (id: string, status: 'new' | 'replied') => {
      await patchInquiry(
        id,
        { status },
        status === 'replied' ? 'Marked as replied' : 'Marked as new'
      )
    },
    [patchInquiry]
  )

  const handleArchiveToggle = useCallback(
    async (id: string, currentArchived: boolean) => {
      const target = !currentArchived
      await patchInquiry(
        id,
        { archived: target },
        target ? 'Inquiry archived' : 'Inquiry restored'
      )
    },
    [patchInquiry]
  )

  const handleAddTag = useCallback(
    async (id: string, rawTag: string) => {
      const normalized = normalizeTagLabel(rawTag)
      if (!normalized) {
        toast.error('Enter a valid tag')
        return false
      }
      return patchInquiry(id, { addTag: normalized }, `Tag "${normalized}" added`)
    },
    [patchInquiry]
  )

  const handleRemoveTag = useCallback(
    async (id: string, tag: string) => {
      return patchInquiry(id, { removeTag: tag }, `Tag "${tag}" removed`)
    },
    [patchInquiry]
  )

  const handleQuickReply = useCallback(
    async (id: string, template: 'thanks' | 'details' | 'availability') => {
      setActioningId(id)
      try {
        const res = await fetch(`/api/inquiries/${id}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ template }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error || 'Failed to send quick reply.')
        }

        toast.success('Quick reply sent')
        await fetchInquiries()
        onActivityTrigger?.()
        return true
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to send quick reply.'
        toast.error(msg)
        return false
      } finally {
        setActioningId(null)
      }
    },
    [fetchInquiries, onActivityTrigger]
  )

  return {
    inquiries,
    summary,
    loading,
    error,
    showArchived,
    setShowArchived,
    actioningId,
    retry: fetchInquiries,
    handleStatusChange,
    handleArchiveToggle,
    handleAddTag,
    handleRemoveTag,
    handleQuickReply,
  }
}

