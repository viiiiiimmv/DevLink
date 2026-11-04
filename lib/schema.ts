import { absoluteUrl, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'

export function generateWebSiteSchema() {
  const siteUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/discover?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationSchema() {
  const siteUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: absoluteUrl('/logo.svg'),
    description: SITE_DESCRIPTION,
    sameAs: ['https://github.com/sh1v-x/DevLink'],
  }
}

export function generateWebApplicationSchema() {
  const siteUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function generateCollectionPageSchema(
  name: string,
  description: string,
  path: string
) {
  const pageUrl = absoluteUrl(path)
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  }
}

export function generateProfilePageSchema(profile: {
  username: string
  name?: string
  bio?: string
  skills?: string[]
  profileImage?: string
  profilePhoto?: { url?: string }
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  createdAt?: string | Date | null
  updatedAt?: string | Date | null
}) {
  const profilePath = `/${encodeURIComponent(profile.username)}`
  const profileUrl = absoluteUrl(profilePath)
  const displayName = profile.name?.trim() || profile.username

  const toIso = (d?: string | Date | null) => {
    if (!d) return undefined
    if (d instanceof Date) return d.toISOString()
    return String(d)
  }

  const sameAs = [
    profile.socialLinks?.github,
    profile.socialLinks?.linkedin,
    profile.socialLinks?.twitter,
    profile.socialLinks?.website,
  ].filter((url): url is string => typeof url === 'string' && url.trim().length > 0)

  const imageUrl = profile.profilePhoto?.url || profile.profileImage

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: displayName,
    identifier: profile.username,
    alternateName: `@${profile.username}`,
    url: profileUrl,
    description: profile.bio || `Developer portfolio for ${displayName} on ${SITE_NAME}`,
    knowsAbout: Array.isArray(profile.skills) ? profile.skills : [],
    mainEntityOfPage: profileUrl,
  }

  if (imageUrl) {
    person.image = imageUrl
  }

  if (sameAs.length > 0) {
    person.sameAs = sameAs
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: person,
    name: `${displayName} - Developer Portfolio`,
    url: profileUrl,
    dateCreated: toIso(profile.createdAt),
    dateModified: toIso(profile.updatedAt),
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Discover', path: '/discover' },
      { name: displayName, path: profilePath },
    ]),
  }
}

export function generateProjectSchema(
  profile: { username: string; name?: string },
  project: {
    id: string
    title: string
    description?: string
    githubUrl?: string
    liveUrl?: string
    image?: string
    technologies?: string[]
  }
) {
  const projectPath = `/${encodeURIComponent(profile.username)}/projects/${encodeURIComponent(project.id)}`
  const projectUrl = absoluteUrl(projectPath)
  const authorUrl = absoluteUrl(`/${encodeURIComponent(profile.username)}`)
  const authorName = profile.name?.trim() || profile.username

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': project.githubUrl ? 'SoftwareSourceCode' : 'Article',
    headline: project.title,
    description: project.description || `${project.title} by ${authorName}`,
    url: projectUrl,
    mainEntityOfPage: projectUrl,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getSiteUrl(),
      logo: absoluteUrl('/logo.svg'),
    },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: authorName, path: `/${encodeURIComponent(profile.username)}` },
      { name: project.title, path: projectPath },
    ]),
  }

  if (project.image) {
    schema.image = project.image
  }

  if (project.githubUrl) {
    schema.codeRepository = project.githubUrl
  }

  if (Array.isArray(project.technologies) && project.technologies.length > 0) {
    schema.programmingLanguage = project.technologies
    schema.keywords = project.technologies.join(', ')
  }

  return schema
}
