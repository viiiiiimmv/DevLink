'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Award, 
  BookOpen, 
  Settings,
  Palette,
  MessageSquare,
  Download,
  LogOut,
  Menu,
  X,
  Code,
  Eye,
  ExternalLink,
  UsersRound,
  MessagesSquare,
  Bell,
  Lightbulb
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SimpleThemeToggle } from '@/components/ui/theme-toggle'
import { connectChatSocket, disconnectChatSocket } from '@/lib/socket-client'
import { CHAT_UNREAD_REFRESH_EVENT } from '@/lib/chat-events'
import { toast } from 'sonner'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DashboardLayoutProps {
  children: React.ReactNode
}

type NotificationConversationSummary = {
  id: string
  unreadCount?: number
  lastMessageText?: string
  peer?: {
    name?: string
  } | null
}

type IncomingSparkSummary = {
  connectionId: string
  peerName?: string
  peerUsername?: string
}

type NavigationItem = {
  name: string
  href: string
  icon: typeof LayoutDashboard
  description: string
  showsUnreadBadge?: boolean
}

type NavigationGroup = {
  label: string
  items: NavigationItem[]
}

const navigationGroups: NavigationGroup[] = [
  {
    label: 'Workspace',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Overview of your activity and progress.',
      },
      {
        name: 'SparkForge',
        href: '/dashboard/sparkforge',
        icon: Lightbulb,
        description: 'Post ideas and discover collaborators.',
      },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: User,
        description: 'Manage core profile and identity.',
      },
      {
        name: 'Projects',
        href: '/dashboard/projects',
        icon: Code,
        description: 'Showcase featured project work.',
      },
      {
        name: 'Experience',
        href: '/dashboard/experience',
        icon: Briefcase,
        description: 'Maintain your work timeline.',
      },
      {
        name: 'Testimonials',
        href: '/dashboard/testimonials',
        icon: MessageSquare,
        description: 'Collect and publish feedback.',
      },
      {
        name: 'Certifications',
        href: '/dashboard/certifications',
        icon: Award,
        description: 'Add credentials and achievements.',
      },
      {
        name: 'Research Papers',
        href: '/dashboard/researches',
        icon: BookOpen,
        description: 'Publish papers and technical writing.',
      },
      {
        name: 'Customise',
        href: '/dashboard/customise',
        icon: Palette,
        description: 'Tune visual style and theme.',
      },
      {
        name: 'Import',
        href: '/dashboard/import',
        icon: Download,
        description: 'Bring profile data from external sources.',
      },
    ],
  },
  {
    label: 'Connections',
    items: [
      {
        name: 'Talent Network',
        href: '/dashboard/network',
        icon: UsersRound,
        description: 'Grow your Code Circle with sparks.',
      },
      {
        name: 'Pulse Chat',
        href: '/dashboard/chats',
        icon: MessagesSquare,
        description: 'Message your active connections.',
        showsUnreadBadge: true,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
        description: 'Security, preferences, and account controls.',
      },
    ],
  },
]

const isNavItemActive = (pathname: string, href: string): boolean => {
  if (href === '/dashboard') {
    return pathname === '/dashboard'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

const getActiveNavigationContext = (pathname: string): {
  groupLabel: string
  item: NavigationItem
} => {
  for (const group of navigationGroups) {
    for (const item of group.items) {
      if (isNavItemActive(pathname, item.href)) {
        return {
          groupLabel: group.label,
          item,
        }
      }
    }
  }

  return {
    groupLabel: navigationGroups[0]?.label || 'Workspace',
    item: navigationGroups[0]?.items[0] || {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview of your activity and progress.',
    },
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const activePathname = pathname ?? ''
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)
  const [isDesktopHovering, setIsDesktopHovering] = useState(false)
  const [unreadPulseCount, setUnreadPulseCount] = useState(0)
  const [notificationSocketConnected, setNotificationSocketConnected] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')
  const [notificationsSupported, setNotificationsSupported] = useState(false)
  const username = (session?.user as { username?: string | null } | undefined)?.username
  const currentUserId = typeof session?.user?.id === 'string' ? session.user.id : ''
  const isOnPulseChat = activePathname.startsWith('/dashboard/chats')
  const isOnPulseChatRef = useRef(isOnPulseChat)
  const userImage =
    typeof session?.user?.image === 'string' && session.user.image.trim().length > 0
      ? session.user.image
      : undefined
  const isDesktopExpanded = !isDesktopCollapsed || isDesktopHovering
  const unreadByConversationRef = useRef<Record<string, number>>({})
  const incomingSparkIdsRef = useRef<Record<string, IncomingSparkSummary>>({})
  const fallbackHydratedRef = useRef(false)
  const activeNavigationContext = useMemo(
    () => getActiveNavigationContext(activePathname),
    [activePathname]
  )

  useEffect(() => {
    isOnPulseChatRef.current = isOnPulseChat
  }, [isOnPulseChat])

  useEffect(() => {
    unreadByConversationRef.current = {}
    incomingSparkIdsRef.current = {}
    fallbackHydratedRef.current = false
  }, [currentUserId])

  const fetchUnreadCount = useCallback(async () => {
    if (!currentUserId) return

    try {
      const response = await fetch('/api/chat/conversations', { cache: 'no-store' })
      if (!response.ok) return
      const data = await response.json()
      const conversations = Array.isArray(data?.conversations) ? data.conversations : []
      const totalUnread = conversations.reduce((sum: number, conversation: any) => {
        const unread = Number(conversation?.unreadCount ?? 0)
        if (!Number.isFinite(unread) || unread <= 0) return sum
        return sum + unread
      }, 0)
      setUnreadPulseCount(totalUnread)
    } catch (error) {
      console.error('Unread count fetch failed:', error)
    }
  }, [currentUserId])

  const maybeShowBrowserNotification = useCallback((title: string, body: string, conversationId: string) => {
    if (typeof window === 'undefined') return
    if (!('Notification' in window)) return
    if (Notification.permission !== 'granted') return

    const notification = new Notification(title, { body })
    notification.onclick = () => {
      window.focus()
      window.location.href = `/dashboard/chats?conversation=${encodeURIComponent(conversationId)}`
      notification.close()
    }
  }, [])

  const pollNotificationFallback = useCallback(async (options?: { notify?: boolean }) => {
    if (!currentUserId) return

    try {
      const [chatResponse, networkResponse] = await Promise.all([
        fetch('/api/chat/conversations', { cache: 'no-store' }),
        fetch('/api/network/connections', { cache: 'no-store' }),
      ])

      if (!chatResponse.ok || !networkResponse.ok) {
        return
      }

      const [chatData, networkData] = await Promise.all([
        chatResponse.json(),
        networkResponse.json(),
      ])

      const conversations = Array.isArray(chatData?.conversations)
        ? chatData.conversations as NotificationConversationSummary[]
        : []
      const incomingSparks = Array.isArray(networkData?.incomingSparks)
        ? networkData.incomingSparks as IncomingSparkSummary[]
        : []

      const totalUnread = conversations.reduce((sum, conversation) => {
        const unread = Number(conversation?.unreadCount ?? 0)
        if (!Number.isFinite(unread) || unread <= 0) return sum
        return sum + unread
      }, 0)
      setUnreadPulseCount(totalUnread)

      const shouldNotify = options?.notify === true && fallbackHydratedRef.current
      const nextUnreadByConversation: Record<string, number> = {}

      for (const conversation of conversations) {
        const conversationId = typeof conversation?.id === 'string' ? conversation.id : ''
        if (!conversationId) continue

        const unread = Number(conversation?.unreadCount ?? 0)
        const unreadCount = Number.isFinite(unread) && unread > 0 ? unread : 0
        nextUnreadByConversation[conversationId] = unreadCount

        if (!shouldNotify || isOnPulseChatRef.current) continue

        const previousUnread = Number(unreadByConversationRef.current[conversationId] ?? 0)
        if (unreadCount <= previousUnread || unreadCount <= 0) {
          continue
        }

        const senderName = conversation.peer?.name || 'a contact'
        const fallbackPreview = `${unreadCount - previousUnread} new message${unreadCount - previousUnread > 1 ? 's' : ''}`
        const preview = typeof conversation?.lastMessageText === 'string' && conversation.lastMessageText.trim().length > 0
          ? conversation.lastMessageText.trim().slice(0, 90)
          : fallbackPreview

        toast(`${senderName} sent a message`, {
          description: preview,
          action: {
            label: 'Open',
            onClick: () => {
              window.location.href = `/dashboard/chats?conversation=${encodeURIComponent(conversationId)}`
            },
          },
        })

        maybeShowBrowserNotification(
          `New message from ${senderName}`,
          preview,
          conversationId
        )
      }

      const nextIncomingSparks: Record<string, IncomingSparkSummary> = {}
      for (const spark of incomingSparks) {
        const connectionId = typeof spark?.connectionId === 'string' ? spark.connectionId : ''
        if (!connectionId) continue
        nextIncomingSparks[connectionId] = spark
      }

      if (shouldNotify) {
        const newSparks = Object.keys(nextIncomingSparks)
          .filter((connectionId) => !incomingSparkIdsRef.current[connectionId])
          .slice(0, 3)

        for (const connectionId of newSparks) {
          const spark = nextIncomingSparks[connectionId]
          const name = typeof spark?.peerName === 'string' && spark.peerName.trim().length > 0
            ? spark.peerName.trim()
            : 'a developer'
          toast.success(`New Link Spark from ${name}`)
        }
      }

      unreadByConversationRef.current = nextUnreadByConversation
      incomingSparkIdsRef.current = nextIncomingSparks
      fallbackHydratedRef.current = true
    } catch (error) {
      console.error('Notification fallback polling failed:', error)
    }
  }, [currentUserId, maybeShowBrowserNotification])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const handleDesktopLogoClick = () => {
    setIsDesktopCollapsed((current) => !current)
    setIsDesktopHovering(false)
  }

  const handleEnableBrowserAlerts = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      toast.error('Browser notifications are not supported here')
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)

      if (permission === 'granted') {
        toast.success('Browser notifications enabled')
        return
      }

      if (permission === 'denied') {
        toast.error('Notifications are blocked. Enable them from browser site settings.')
        return
      }

      toast('Notification permission dismissed')
    } catch (error) {
      console.error('Notification permission request failed:', error)
      toast.error('Unable to enable notifications')
    }
  }, [])

  const formatUnreadCount = (count: number) => {
    if (count > 99) return '99+'
    return `${count}`
  }

  const renderNavItem = (item: NavigationItem, options: { collapsed: boolean }) => {
    const showUnread = Boolean(item.showsUnreadBadge) && unreadPulseCount > 0
    const isActive = isNavItemActive(activePathname, item.href)

    return (
      <Link key={item.name} href={item.href}>
        <div className={`relative flex items-center text-sm font-medium transition-all duration-150 ${
          options.collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2 justify-start'
        } ${
          isActive
            ? 'bg-[#6366F1]/10 border-l-2 border-[#6366F1] text-[#F8FAFC]'
            : 'bg-transparent border-l-2 border-transparent text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/[0.03]'
        } rounded-r-md`}>
          <item.icon className={`h-4.5 w-4.5 shrink-0 ${options.collapsed ? '' : 'mr-3'} ${isActive ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`} />
          {!options.collapsed ? (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span>{item.name}</span>
              {showUnread ? (
                <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-[#6366F1] px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  {formatUnreadCount(unreadPulseCount)}
                </span>
              ) : null}
            </span>
          ) : null}
          {options.collapsed && showUnread ? (
            <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[#6366F1]" />
          ) : null}
        </div>
      </Link>
    )
  }

  useEffect(() => {
    if (!currentUserId) return

    const handleVisibilitySync = () => {
      if (document.visibilityState !== 'visible') return
      if (notificationSocketConnected) {
        fetchUnreadCount()
        return
      }

      pollNotificationFallback({ notify: false })
    }

    if (notificationSocketConnected) {
      fetchUnreadCount()
    } else {
      pollNotificationFallback({ notify: false })
    }

    window.addEventListener('focus', handleVisibilitySync)
    document.addEventListener('visibilitychange', handleVisibilitySync)

    return () => {
      window.removeEventListener('focus', handleVisibilitySync)
      document.removeEventListener('visibilitychange', handleVisibilitySync)
    }
  }, [currentUserId, fetchUnreadCount, notificationSocketConnected, pollNotificationFallback])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!currentUserId) return

    const supported = 'Notification' in window
    setNotificationsSupported(supported)

    if (!supported) return
    setNotificationPermission(Notification.permission)
  }, [currentUserId])

  useEffect(() => {
    if (!currentUserId) return

    let mounted = true
    let detachSocketHandlers: (() => void) | null = null

    const onRefreshUnread = () => {
      fetchUnreadCount()
    }

    const setupSocket = async () => {
      try {
        const socket = await connectChatSocket()
        if (!mounted) return

        const handleConversationUpdate = (payload: {
          conversationId: string
          lastMessageText: string
          lastMessageAt: string
          lastMessageSenderId: string
          senderName: string
        }) => {
          fetchUnreadCount()

          const isIncoming = payload.lastMessageSenderId !== currentUserId
          if (!isIncoming || isOnPulseChatRef.current) {
            return
          }

          const preview = payload.lastMessageText.length > 90
            ? `${payload.lastMessageText.slice(0, 90)}...`
            : payload.lastMessageText

          toast(`${payload.senderName} sent a message`, {
            description: preview,
            action: {
              label: 'Open',
              onClick: () => {
                window.location.href = `/dashboard/chats?conversation=${encodeURIComponent(payload.conversationId)}`
              },
            },
          })

          maybeShowBrowserNotification(
            `New message from ${payload.senderName}`,
            preview || 'Open Pulse Chat to respond.',
            payload.conversationId
          )
        }

        const handleRead = () => {
          fetchUnreadCount()
        }

        const handleConnect = () => {
          setNotificationSocketConnected(true)
          fallbackHydratedRef.current = false
          fetchUnreadCount()
        }

        const handleDisconnect = () => {
          setNotificationSocketConnected(false)
          fallbackHydratedRef.current = false
        }

        socket.on('chat:conversation:update', handleConversationUpdate)
        socket.on('chat:read', handleRead)
        socket.on('connect', handleConnect)
        socket.on('disconnect', handleDisconnect)
        setNotificationSocketConnected(socket.connected)

        detachSocketHandlers = () => {
          socket.off('chat:conversation:update', handleConversationUpdate)
          socket.off('chat:read', handleRead)
          socket.off('connect', handleConnect)
          socket.off('disconnect', handleDisconnect)
        }
      } catch (error) {
        console.error('Notification socket init failed:', error)
        setNotificationSocketConnected(false)
        fallbackHydratedRef.current = false
      }
    }

    window.addEventListener(CHAT_UNREAD_REFRESH_EVENT, onRefreshUnread)
    setupSocket()

    return () => {
      mounted = false
      window.removeEventListener(CHAT_UNREAD_REFRESH_EVENT, onRefreshUnread)
      if (detachSocketHandlers) {
        detachSocketHandlers()
      }
      setNotificationSocketConnected(false)
      fallbackHydratedRef.current = false
      disconnectChatSocket()
    }
  }, [currentUserId, fetchUnreadCount, maybeShowBrowserNotification])

  useEffect(() => {
    if (!currentUserId || notificationSocketConnected) return

    const runPollingSnapshot = () => {
      pollNotificationFallback({ notify: fallbackHydratedRef.current })
    }

    runPollingSnapshot()

    const interval = window.setInterval(() => {
      runPollingSnapshot()
    }, 20000)

    return () => {
      window.clearInterval(interval)
    }
  }, [currentUserId, notificationSocketConnected, pollNotificationFallback])

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC]">
      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        
        <div className={`fixed inset-y-0 left-0 flex w-full max-w-xs transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col w-full bg-[#0F172A] border-r border-[#1E293B] shadow-2xl">
            <div className="flex items-center justify-between h-16 px-6 border-b border-[#1E293B]">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20">
                  <Code className="h-5 w-5 text-[#6366F1]" />
                </div>
                <span className="ml-3 text-lg font-semibold tracking-tight text-[#F8FAFC]">DevLink</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
              {navigationGroups.map((group) => (
                <section key={group.label} className="space-y-1.5">
                  <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => renderNavItem(item, { collapsed: false }))}
                  </div>
                </section>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      {isDesktopCollapsed && !isDesktopHovering ? (
        <div
          className="hidden lg:block fixed inset-y-0 left-0 z-20 w-3"
          onMouseEnter={() => setIsDesktopHovering(true)}
          aria-hidden
        />
      ) : null}

      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col transition-[width] duration-200 ${
          isDesktopExpanded ? 'lg:w-64' : 'lg:w-16'
        }`}
        onMouseEnter={() => {
          if (isDesktopCollapsed) setIsDesktopHovering(true)
        }}
        onMouseLeave={() => {
          if (isDesktopCollapsed) setIsDesktopHovering(false)
        }}
      >
        <div className="flex flex-col flex-grow bg-[#0F172A] border-r border-[#1E293B] shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={handleDesktopLogoClick}
            className={`flex items-center h-16 border-b border-[#1E293B] transition-[padding] duration-200 hover:bg-[#1E293B]/40 ${
              isDesktopExpanded ? 'px-6 justify-start' : 'px-0 justify-center'
            }`}
            aria-label={isDesktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isDesktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 shrink-0">
              <Code className="h-5 w-5 text-[#6366F1]" />
            </div>
            {isDesktopExpanded ? (
              <span className="ml-3 text-lg font-semibold tracking-tight text-[#F8FAFC] whitespace-nowrap">DevLink</span>
            ) : null}
          </button>
          <div className="sr-only" aria-live="polite">
            {isDesktopCollapsed ? 'Sidebar collapsed' : 'Sidebar expanded'}
          </div>
          
          <nav className={`flex-1 overflow-y-auto py-5 transition-[padding] duration-200 ${isDesktopExpanded ? 'px-4' : 'px-2'}`}>
            <div className="space-y-4">
              {navigationGroups.map((group, groupIndex) => (
                <section key={group.label} className="space-y-1.5">
                  {isDesktopExpanded ? (
                    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                      {group.label}
                    </p>
                  ) : groupIndex > 0 ? (
                    <div className="mx-2 border-t border-[#1E293B]" />
                  ) : null}
                  <div className="space-y-1">
                    {group.items.map((item) => renderNavItem(item, { collapsed: !isDesktopExpanded }))}
                  </div>
                </section>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-[padding] duration-200 ${isDesktopCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 bg-[#0F172A] border-b border-[#1E293B]">
          <button
            type="button"
            className="px-4 border-r border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-between px-4 lg:px-6">
            <div className="flex items-center">
              <div className="sm:hidden">
                <p className="text-sm font-semibold text-[#F8FAFC]">
                  {activeNavigationContext.item.name}
                </p>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:py-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                  {activeNavigationContext.groupLabel}
                </p>
                <p className="text-sm font-semibold text-[#F8FAFC]">
                  {activeNavigationContext.item.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <SimpleThemeToggle />
              {notificationsSupported && notificationPermission !== 'granted' ? (
                <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={handleEnableBrowserAlerts}>
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Enable Alerts</span>
                </Button>
              ) : null}
              <Link href={`/${username ?? ''}`} target="_blank">
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[#06B6D4]" />
                  <span className="hidden sm:inline">View Portfolio</span>
                  <ExternalLink className="h-3 w-3 text-[#94A3B8]" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 border border-[#334155]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userImage} />
                      <AvatarFallback className="bg-[#1E293B] text-[#F8FAFC] text-xs font-semibold">
                        {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm text-[#F8FAFC]">{session?.user?.name}</p>
                      <p className="w-[200px] truncate text-xs text-[#94A3B8]">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4 text-[#94A3B8]" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/customise">
                      <Palette className="mr-2 h-4 w-4 text-[#94A3B8]" />
                      Customise
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4 text-[#94A3B8]" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-[#EF4444] hover:text-[#EF4444] focus:text-[#EF4444]">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="p-6 lg:p-8">
            <div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
