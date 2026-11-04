'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { DashboardNotificationItem } from '@/types/dashboard'
import { mergeNotifications } from '@/lib/dashboard-utils'
import { connectChatSocket } from '@/lib/socket-client'
import { toast } from 'sonner'

export function useDashboardNotifications(currentUserId?: string) {
  const [notifications, setNotifications] = useState<DashboardNotificationItem[]>([])
  const [pendingSparksCount, setPendingSparksCount] = useState<number>(0)
  const [unreadChatsCount, setUnreadChatsCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socketConnected, setSocketConnected] = useState(false)

  const fetchNotifications = useCallback(async (options?: { silent?: boolean }) => {
    if (!options?.silent) {
      setLoading(true)
      setError(null)
    }

    try {
      const [netResult, chatResult] = await Promise.allSettled([
        fetch('/api/network/connections', { cache: 'no-store' }),
        fetch('/api/chat/conversations', { cache: 'no-store' }),
      ])

      let incomingSparks: any[] = []
      let conversations: any[] = []

      if (netResult.status === 'fulfilled' && netResult.value.ok) {
        const netData = await netResult.value.json().catch(() => null)
        incomingSparks = Array.isArray(netData?.incomingSparks) ? netData.incomingSparks : []
      }

      if (chatResult.status === 'fulfilled' && chatResult.value.ok) {
        const chatData = await chatResult.value.json().catch(() => null)
        conversations = Array.isArray(chatData?.conversations) ? chatData.conversations : []
      }

      if (netResult.status === 'rejected' && chatResult.status === 'rejected') {
        throw new Error('Unable to fetch live notifications.')
      }

      setPendingSparksCount(incomingSparks.length)

      const unreadCount = conversations.reduce((total, conv) => {
        const count = Number(conv?.unreadCount ?? 0)
        return Number.isFinite(count) && count > 0 ? total + count : total
      }, 0)
      setUnreadChatsCount(unreadCount)

      const merged = mergeNotifications(incomingSparks, conversations)
      setNotifications(merged.slice(0, 8))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to notification services.'
      if (!options?.silent) {
        setError(msg)
      }
    } finally {
      if (!options?.silent) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Realtime Socket integration
  useEffect(() => {
    if (!currentUserId) return

    let isMounted = true
    let detachListeners: (() => void) | null = null

    const setupSocket = async () => {
      try {
        const socket = await connectChatSocket()
        if (!isMounted) return

        const onConnect = () => setSocketConnected(true)
        const onDisconnect = () => setSocketConnected(false)

        const handleNetworkUpdate = (payload: {
          type: string
          fromName?: string
        }) => {
          if (payload.type === 'spark_incoming') {
            toast.info(`New Link Spark from ${payload.fromName || 'a developer'}`)
          }
          fetchNotifications({ silent: true })
        }

        const handleChatUpdate = (payload: {
          lastMessageSenderId?: string
          senderName?: string
        }) => {
          if (payload.lastMessageSenderId !== currentUserId) {
            toast.info(`New message from ${payload.senderName || 'a contact'}`)
          }
          fetchNotifications({ silent: true })
        }

        const handleChatRead = () => {
          fetchNotifications({ silent: true })
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('network:connection:update', handleNetworkUpdate)
        socket.on('chat:conversation:update', handleChatUpdate)
        socket.on('chat:read', handleChatRead)

        setSocketConnected(socket.connected)

        detachListeners = () => {
          socket.off('connect', onConnect)
          socket.off('disconnect', onDisconnect)
          socket.off('network:connection:update', handleNetworkUpdate)
          socket.off('chat:conversation:update', handleChatUpdate)
          socket.off('chat:read', handleChatRead)
        }
      } catch (err) {
        console.error('Socket init error in dashboard notifications:', err)
        setSocketConnected(false)
      }
    }

    setupSocket()

    return () => {
      isMounted = false
      if (detachListeners) {
        detachListeners()
      }
    }
  }, [currentUserId, fetchNotifications])

  // Polling fallback when socket is not connected; pauses on document hidden
  useEffect(() => {
    if (!currentUserId) return

    const handleSync = () => {
      if (document.visibilityState === 'visible') {
        fetchNotifications({ silent: true })
      }
    }

    // Only run periodic polling if socket is disconnected
    let intervalId: number | null = null
    if (!socketConnected) {
      intervalId = window.setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchNotifications({ silent: true })
        }
      }, 30000)
    }

    window.addEventListener('focus', handleSync)
    document.addEventListener('visibilitychange', handleSync)

    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId)
      }
      window.removeEventListener('focus', handleSync)
      document.removeEventListener('visibilitychange', handleSync)
    }
  }, [currentUserId, fetchNotifications, socketConnected])

  return {
    notifications,
    pendingSparksCount,
    unreadChatsCount,
    loading,
    error,
    retry: fetchNotifications,
  }
}

