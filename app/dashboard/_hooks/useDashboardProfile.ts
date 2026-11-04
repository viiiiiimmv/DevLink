'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'
import type { DashboardProfile } from '@/types/dashboard'

export function useDashboardProfile() {
  const [profile, setProfile] = useState<DashboardProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [publishSaving, setPublishSaving] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchProfile = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/profile', {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      })

      if (res.status === 401) {
        window.location.href = '/auth/signin?from=/dashboard'
        return
      }

      if (res.status === 404) {
        window.location.href = '/dashboard/setup'
        return
      }

      if (!res.ok) {
        throw new Error('Failed to load profile data.')
      }

      const data = await res.json()
      setProfile(data)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : 'Unable to connect to profile service.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchProfile])

  const setPublishState = useCallback(async (isPublished: boolean) => {
    setPublishSaving(true)
    try {
      const res = await fetch('/api/profile/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.error || 'Failed to update publication status.')
      }

      const data = await res.json()
      if (data?.profile) {
        setProfile(data.profile)
      } else {
        await fetchProfile()
      }

      toast.success(isPublished ? 'Portfolio published' : 'Portfolio set to draft')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update publication status.'
      toast.error(msg)
    } finally {
      setPublishSaving(false)
    }
  }, [fetchProfile])

  const republishChanges = useCallback(async () => {
    return setPublishState(true)
  }, [setPublishState])

  return {
    profile,
    loading,
    error,
    publishSaving,
    fetchProfile,
    setPublishState,
    republishChanges,
  }
}

