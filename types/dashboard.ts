import type {
  IProfile,
  IProject,
  IExperience,
  ICertification,
  IResearch,
  ITestimonial,
  ISocialLinks,
  IProfilePublishSnapshot,
} from '@/models/Profile'

export type {
  IProfile,
  IProject,
  IExperience,
  ICertification,
  IResearch,
  ITestimonial,
  ISocialLinks,
  IProfilePublishSnapshot,
}

export interface DashboardProfile {
  username: string
  name: string
  bio: string
  skills: string[]
  profileImage?: string
  profilePhoto?: {
    url?: string
    publicId?: string
  }
  socialLinks?: ISocialLinks
  projects: IProject[]
  experiences: IExperience[]
  certifications: ICertification[]
  researches: IResearch[]
  testimonials?: ITestimonial[]
  theme: string
  template?: string
  isPublished?: boolean
  lastPublishedAt?: string | null
  lastPublishedSnapshot?: IProfilePublishSnapshot
  updatedAt?: string
  sectionSettings?: Array<{
    id: string
    visible: boolean
  }>
}

export interface AnalyticsSummary {
  rangeStart: string
  rangeEnd: string
  views: number
  uniqueVisitors: number
  topReferrers: Array<{ referrer: string; count: number }>
  topProjects: Array<{ projectId: string; title: string; count: number }>
}

export interface InquiryItemData {
  _id: string
  name: string
  email: string
  message: string
  status: 'new' | 'replied'
  tags?: string[]
  archived?: boolean
  archivedAt?: string | null
  lastQuickReplyAt?: string | null
  createdAt: string
}

export interface InquirySummary {
  total: number
  new: number
  replied: number
  archived: number
  unarchived: number
}

export interface ActivityItemData {
  _id: string
  message: string
  createdAt: string
}

export interface DashboardNotificationItem {
  id: string
  title: string
  description: string
  href: string
  type: 'spark' | 'message'
  createdAt: string
}

