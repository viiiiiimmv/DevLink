'use client'

import { useState, useEffect, Suspense } from 'react'
import { signIn, getProviders } from 'next-auth/react'
import type { ClientSafeProvider } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Github, Chrome, ArrowLeft } from 'lucide-react'
import { LogoIcon } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import toast from 'react-hot-toast'

type SupportedProviderId = 'google' | 'github'

const providerConfig: Record<
  SupportedProviderId,
  {
    label: string
    className: string
    Icon: typeof Chrome
  }
> = {
  google: {
    label: 'Continue with Google',
    className: 'w-full bg-red-600 hover:bg-red-700 text-white',
    Icon: Chrome,
  },
  github: {
    label: 'Continue with GitHub',
    className: 'w-full bg-gray-900 hover:bg-gray-800 text-white',
    Icon: Github,
  },
}

const providerOrder: SupportedProviderId[] = ['google', 'github']

function SignInContent() {
  const [loading, setLoading] = useState<string | null>(null)
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({})
  const [providersLoading, setProvidersLoading] = useState(true)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams?.get('error') ?? null
  const from = searchParams?.get('from') ?? null

  useEffect(() => {
    if (error) {
      let message = 'An error occurred during sign in'
      switch (error) {
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
          message = 'Error with OAuth provider. Please try again.'
          break
        case 'OAuthAccountNotLinked':
          message = 'Account already exists with different provider.'
          break
        case 'AccessDenied':
          message = 'Sign in was denied. Please verify OAuth credentials and try again.'
          break
        case 'SessionRequired':
          message = 'Please sign in to continue.'
          break
        default:
          message = 'Authentication failed. Please try again.'
      }
      toast.error(message)
    }
  }, [error])

  useEffect(() => {
    let active = true

    const loadProviders = async () => {
      try {
        const providerMap = await getProviders()
        if (active && providerMap) {
          setProviders(providerMap)
        }
      } catch (providerError) {
        console.error('Failed to load auth providers:', providerError)
      } finally {
        if (active) {
          setProvidersLoading(false)
        }
      }
    }

    loadProviders()

    return () => {
      active = false
    }
  }, [])

  const enabledProviderIds = providerOrder.filter((providerId) => Boolean(providers[providerId]))

  const sanitizeCallbackUrl = (url: string | null): string => {
    if (!url) return '/dashboard'
    // Must be a relative path starting with single '/' and no protocol or double slash
    if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\')) {
      return url
    }
    return '/dashboard'
  }

  const handleSignIn = async (provider: string) => {
    if (!agreedToTerms) {
      setConsentError(true)
      toast.error('Please accept the Terms of Service and Privacy Policy to continue.')
      return
    }
    setConsentError(false)
    setLoading(provider)
    const targetUrl = sanitizeCallbackUrl(from)
    try {
      const result = await signIn(provider, {
        callbackUrl: targetUrl,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Sign in failed. Please try again.')
        setLoading(null)
      } else if (result?.ok) {
        toast.success('Signing you in...')
        router.push(targetUrl)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('An unexpected error occurred')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-1">
            <div className="flex items-center justify-center mb-3">
              <LogoIcon size={32} />
            </div>
            <CardTitle className="text-xl font-bold">Welcome to DevLink</CardTitle>
            <CardDescription>
              Sign in to create and manage your developer portfolio
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {enabledProviderIds.map((providerId) => {
              const config = providerConfig[providerId]
              const Icon = config.Icon

              return (
                <Button
                  key={providerId}
                  onClick={() => handleSignIn(providerId)}
                  disabled={loading !== null || providersLoading}
                  className={config.className}
                  size="lg"
                >
                  {loading === providerId ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Icon className="h-5 w-5 mr-2" />
                  )}
                  {config.label}
                </Button>
              )
            })}

            {!providersLoading && enabledProviderIds.length === 0 && (
              <p className="text-xs text-destructive text-center">
                No authentication providers are configured. Please set OAuth credentials in `.env`.
              </p>
            )}

            {/* Affirmative Consent Line (Unchecked by default) */}
            <div className="space-y-2 pt-3 border-t border-border">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked)
                    if (e.target.checked) setConsentError(false)
                  }}
                  className="mt-0.5 h-3.5 w-3.5 rounded-[3px] border border-border bg-background text-foreground focus:ring-1 focus:ring-ring"
                />
                <span>
                  I have read and agree to the{' '}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-foreground underline underline-offset-2 hover:opacity-80"
                  >
                    Terms &amp; Conditions
                  </Link>{' '}
                  and acknowledge the{' '}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-foreground underline underline-offset-2 hover:opacity-80"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {consentError && (
                <p className="text-[11px] font-mono text-destructive">
                  Affirmative consent required: Please check the box to proceed.
                </p>
              )}
            </div>

            <div className="text-center pt-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignInContent />
    </Suspense>
  )
}
