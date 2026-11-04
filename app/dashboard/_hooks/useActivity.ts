'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { ActivityItemData } from '@/types/dashboard'

export function useActivity(limit: number = 8) {
  const [activities, setActivities] = useState<ActivityItemData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchActivities = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/activity?limit=${limit}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      })

      if (!res.ok) {
        throw new Error('Failed to load recent activity.')
      }

      const data = await res.json()
      setActivities(Array.isArray(data?.activities) ? data.activities : [])
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : 'Unable to load activity logs.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchActivities()
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchActivities])

  return {
    activities,
    loading,
    error,
    retry: fetchActivities,
  }
}

