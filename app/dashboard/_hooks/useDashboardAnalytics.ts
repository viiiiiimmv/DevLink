'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { AnalyticsSummary } from '@/types/dashboard'

export type AnalyticsDays = 7 | 30 | 90

export function useDashboardAnalytics(initialDays: AnalyticsDays = 30) {
  const [days, setDays] = useState<AnalyticsDays>(initialDays)
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchAnalytics = useCallback(async (targetDays?: AnalyticsDays) => {
    const range = targetDays ?? days
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/analytics?days=${range}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      })

      if (!res.ok) {
        throw new Error('Failed to load analytics metrics.')
      }

      const data = await res.json()
      setAnalytics(data)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : 'Unable to load analytics.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    fetchAnalytics()
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchAnalytics])

  return {
    days,
    setDays,
    analytics,
    loading,
    error,
    retry: fetchAnalytics,
  }
}

