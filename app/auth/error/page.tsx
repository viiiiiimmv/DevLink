'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function ErrorPageContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error') ?? null

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Configuration Error',
          description: 'There is a problem with the server authentication configuration. Please try again later.',
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          description: 'You do not have permission to access this resource or sign in.',
        }
      case 'Verification':
        return {
          title: 'Verification Expired',
          description: 'The sign-in link is no longer valid. It may have expired or already been used.',
        }
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
        return {
          title: 'Authentication Error',
          description: 'An error occurred with the authentication provider. Please try signing in again.',
        }
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Exists',
          description: 'An account with this email already exists with a different provider. Please sign in with your original provider.',
        }
      case 'SessionRequired':
        return {
          title: 'Session Required',
          description: 'You must be signed in with an active session to access this page.',
        }
      default:
        return {
          title: 'Authentication Error',
          description: 'An unexpected authentication error occurred. Please try signing in again.',
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-3">
            <div className="flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-xl font-bold text-foreground">
              {errorInfo.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs leading-relaxed">
              {errorInfo.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 pt-2">
              <Link href="/auth/signin" className="w-full block">
                <Button className="w-full" variant="default">
                  Return to Sign In
                </Button>
              </Link>
              <Link href="/" className="w-full block">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                  Back to Home
                </Button>
              </Link>
            </div>
            {error && (
              <div className="text-center text-[11px] font-mono text-muted-foreground border-t border-border pt-3">
                Error identifier: {error}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ErrorPageContent />
    </Suspense>
  )
}
