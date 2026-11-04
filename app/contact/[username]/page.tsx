import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { db } from '@/lib/db'
import InquiryForm from '@/components/InquiryForm'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/schema'

type ContactPageProps = {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { username } = await params
  const profile = await db.findProfile(username)

  if (!profile || profile.isPublished === false) {
    return {
      title: 'Profile not found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const displayName = profile.name?.trim() || profile.username
  const title = `Contact ${displayName}`
  const description = `Send an inquiry, collaboration proposal, or project question to ${displayName} on ${SITE_NAME}.`
  const canonicalUrl = absoluteUrl(`/contact/${encodeURIComponent(profile.username)}`)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { username } = await params
  const profile = await db.findProfile(username)

  if (!profile || profile.isPublished === false) {
    notFound()
  }

  const displayName = profile.name || profile.username
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: displayName, path: `/${encodeURIComponent(profile.username)}` },
    { name: 'Contact', path: `/contact/${encodeURIComponent(profile.username)}` },
  ])

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contact {displayName}
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            Send a message to {displayName}
          </h1>
          <p className="text-muted-foreground">
            Share project details, collaboration ideas, or hiring opportunities. Your message goes
            directly to their DevLink inbox.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <InquiryForm username={profile.username} profileName={displayName} />
        </div>
      </div>
    </div>
  )
}
