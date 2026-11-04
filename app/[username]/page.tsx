import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { db } from '@/lib/db'
import PublicProfile from '@/components/public-profile/profile'
import { absoluteUrl, clampText, SITE_NAME } from '@/lib/seo'
import { generateProfilePageSchema } from '@/lib/schema'
import { authOptions } from '@/lib/auth'

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

type ProfileRouteParams = {
  username: string
}

type ProfilePageProps = {
  params: Promise<ProfileRouteParams>
}

const getProfileDescription = (name: string, bio: string) =>
  bio?.trim()
    ? clampText(bio, 160)
    : `Explore ${name}'s developer portfolio with projects, skills, and experience on ${SITE_NAME}.`

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params
  const profile = await db.findProfile(username)
  
  if (!profile) {
    return {
      title: 'Profile not found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  if (profile.isPublished === false) {
    return {
      title: `${profile.name} - Draft profile`,
      description: 'This profile is currently not published.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const displayName = profile.name?.trim() || profile.username
  const profilePath = `/${encodeURIComponent(profile.username)}`
  const profileUrl = absoluteUrl(profilePath)
  const ogImageUrl = absoluteUrl(`${profilePath}/opengraph-image`)
  const description = getProfileDescription(displayName, profile.bio || '')

  return {
    title: `${displayName} — Developer Portfolio`,
    description,
    keywords: ['developer portfolio', 'software engineer', ...(profile.skills || [])],
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      title: `${displayName} — Developer Portfolio`,
      description,
      url: profileUrl,
      siteName: SITE_NAME,
      type: 'profile',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${displayName} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} — Developer Portfolio`,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  const profile = await db.findProfile(username)

  if (!profile) {
    notFound()
  }

  const session = await getServerSession(authOptions)
  const viewerUsername =
    session?.user && typeof (session.user as { username?: unknown }).username === 'string'
      ? (session.user as { username: string }).username
      : null
  const canViewUnpublished = viewerUsername === profile.username

  if (profile.isPublished === false && !canViewUnpublished) {
    notFound()
  }

  // Fix experiences endDate type
  const fixedProfile = {
    ...profile,
    experiences: profile.experiences?.map((exp: any) => ({
      ...exp,
      endDate: exp.endDate === null ? undefined : exp.endDate,
    })) ?? [],
  }

  const structuredData = generateProfilePageSchema(fixedProfile)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <PublicProfile profile={fixedProfile} showSignature trackAnalytics={!canViewUnpublished} />
    </>
  )
}
