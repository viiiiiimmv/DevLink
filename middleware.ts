import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Strictly allowed public pages reachable without an authenticated session
const PUBLIC_PAGES = new Set([
  '/',
  '/auth/signin',
  '/privacy',
  '/terms',
])

// Technical asset prefixes and technical auth endpoints that must remain accessible
const TECHNICAL_PATH_PREFIXES = [
  '/_next',
  '/api/auth', // NextAuth OAuth handlers, session, CSRF
]

const TECHNICAL_EXACT_PATHS = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/opengraph-image',
  '/favicon.ico',
  '/favicon.png',
  '/favicon.svg',
  '/logo.png',
  '/logo-dark.png',
  '/logo-2x.png',
  '/logo.svg',
])

function isTechnicalEndpoint(pathname: string): boolean {
  if (TECHNICAL_EXACT_PATHS.has(pathname)) return true
  for (const prefix of TECHNICAL_PATH_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) return true
  }
  return false
}

function sanitizeCallbackPath(pathname: string, search: string): string {
  // Validate path to prevent open redirects: must be a same-origin relative path starting with single '/'
  if (pathname.startsWith('/') && !pathname.startsWith('//') && !pathname.startsWith('/\\')) {
    return pathname + (search || '')
  }
  return '/dashboard'
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // 1. Allow technical assets, SEO files, and OAuth auth endpoints
  if (isTechnicalEndpoint(pathname)) {
    return NextResponse.next()
  }

  // 2. Retrieve session token securely using NextAuth secret
  let token = null
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    })
  } catch (err) {
    // If token parsing fails or session is corrupted, treat as unauthenticated
    token = null
  }

  const isAuthenticated = !!token

  // 3. Handle Public Pages
  if (PUBLIC_PAGES.has(pathname)) {
    // If an authenticated user opens the login page, redirect them to the main app page
    if (pathname === '/auth/signin' && isAuthenticated) {
      const destination = token?.onboardingCompleted === false ? '/dashboard/setup' : '/dashboard'
      return NextResponse.redirect(new URL(destination, req.url))
    }
    return NextResponse.next()
  }

  // 4. Everything else: Default is DENY (Authentication Required)
  if (!isAuthenticated) {
    // For protected API endpoints, return 401 Unauthorized
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication session required' },
        { status: 401 }
      )
    }

    // For all protected pages, redirect to login with validated callback parameter
    const safeFrom = sanitizeCallbackPath(pathname, search)
    const signinUrl = new URL(`/auth/signin?from=${encodeURIComponent(safeFrom)}`, req.url)
    const response = NextResponse.redirect(signinUrl)

    // Clear any invalid session cookie if present to prevent redirect loops
    if (req.cookies.has('next-auth.session-token') || req.cookies.has('__Secure-next-auth.session-token')) {
      response.cookies.delete('next-auth.session-token')
      response.cookies.delete('__Secure-next-auth.session-token')
    }

    return response
  }

  // 5. Authenticated Session Enforcement (PIN & Onboarding)
  const isPinPage = pathname.startsWith('/auth/pin')
  const isSetupPage = pathname === '/dashboard/setup'
  const isDashboard = pathname.startsWith('/dashboard')

  // Check PIN verification if PIN security is enabled
  if (token?.pinEnabled === true && token?.pinVerified !== true) {
    if (!isPinPage) {
      const safeFrom = sanitizeCallbackPath(pathname, search)
      return NextResponse.redirect(
        new URL(`/auth/pin?from=${encodeURIComponent(safeFrom)}`, req.url)
      )
    }
    return NextResponse.next()
  }

  // If user completed PIN and tries to visit PIN page again
  if (isPinPage && (token?.pinEnabled !== true || token?.pinVerified === true)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Onboarding enforcement for users who haven't completed setup
  if (token?.onboardingCompleted === false && !isSetupPage && isDashboard) {
    return NextResponse.redirect(new URL('/dashboard/setup', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static Next.js assets
     */
    '/((?!_next/static|_next/image).*)',
  ],
}
