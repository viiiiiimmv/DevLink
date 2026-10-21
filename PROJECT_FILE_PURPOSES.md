# DevLink Project File Purpose Guide

This document explains the main purpose of the important files and folders in the DevLink project so that developers can understand how the app is organized without reading every file manually.

---

## 1) Project Overview

DevLink is a Next.js application for building and sharing developer portfolios. It combines:

- portfolio/profile building
- public profile pages with custom usernames
- discovery/search of other developers
- outreach/inquiries
- a collaborative idea board called SparkForge
- dashboard management for profile, projects, experience, and settings
- authentication and onboarding flows
- MongoDB-backed data storage

The app uses Next.js App Router, TypeScript, Tailwind CSS, MongoDB/Mongoose, and NextAuth.

---

## 2) Root-Level Files

### Core application files

- `package.json`  
  Defines project scripts, dependencies, and app metadata. Includes commands like `npm run dev`, `npm run build`, and MongoDB setup scripts.

- `next.config.js`  
  Next.js configuration file for app behavior and framework settings.

- `tsconfig.json`  
  TypeScript compiler configuration.

- `tailwind.config.ts`  
  Tailwind configuration and theme setup.

- `postcss.config.js`  
  Enables Tailwind/PostCSS processing for styling.

- `middleware.ts`  
  Global middleware for request handling, auth checks, and route protection.

### Environment and setup files

- `docker-compose.yml`  
  Runs local MongoDB via Docker for development.

- `SETUP-MONGODB.md`  
  Setup instructions for configuring MongoDB in the project.

- `SMTP-SETUP.md`  
  Instructions for setting up SMTP/email delivery for contact and notification flows.

- `README-AUTH-DEBUG.md`  
  Troubleshooting and auth-debug notes for login and session issues.

- `README.md`  
  Main project overview, setup instructions, and usage details.

### App config and static files

- `components.json`  
  Components UI config for shadcn-style component generation.

- `next-env.d.ts`  
  TypeScript references for Next.js.

- `app/globals.css`  
  Global styles, design tokens, and Tailwind base styling.

- `app/robots.ts` and `app/sitemap.ts`  
  SEO metadata files for search engine indexing and sitemap generation.

- `app/opengraph-image.tsx`  
  Social sharing preview image for Open Graph.

---

## 3) App Router Structure (`app/`)

This is the main application layer using Next.js App Router.

### Public pages

- `app/page.tsx`  
  Home page / landing page for the platform.

- `app/discover/page.tsx`  
  Discovery page for browsing developer profiles.

- `app/sparkforge/page.tsx`  
  SparkForge landing page for idea sharing and collaboration.

- `app/contact/[username]/page.tsx`  
  Contact page for reaching a specific profile owner.

- `app/[username]/page.tsx`  
  Public profile page for a developer, based on their custom username.

- `app/[username]/projects/page.tsx`  
  Publicly viewable project portfolio for a specific developer.

- `app/not-found.tsx`  
  Custom 404 page.

### Authentication pages

- `app/auth/...`  
  Authentication routes for sign-in, PIN login, and error handling. These pages support the login experience.

### Dashboard and account pages

- `app/dashboard/layout.tsx`  
  Dashboard shell and layout for authenticated users.

- `app/dashboard/page.tsx`  
  Main dashboard home screen.

- `app/dashboard/profile/`  
  Profile management screens.

- `app/dashboard/projects/`  
  Project CRUD and portfolio management.

- `app/dashboard/experience/`  
  Experience and employment history editing.

- `app/dashboard/certifications/`  
  Certifications and credentials management.

- `app/dashboard/researches/`  
  Research-related portfolio sections.

- `app/dashboard/testimonials/`  
  Testimonials and social proof management.

- `app/dashboard/settings/`  
  Account settings, preferences, and security configuration.

- `app/dashboard/customise/`  
  Portfolio customization options such as themes and layout.

- `app/dashboard/setup/`  
  Onboarding/setup flow for new users.

- `app/dashboard/import/`  
  Import flow for bringing in portfolio or profile data.

- `app/dashboard/network/`  
  Networking and connection-related views.

- `app/dashboard/chats/`  
  Messaging/inbox functionality.

- `app/dashboard/sparkforge/`  
  User-specific SparkForge board management.

### Root app layout and metadata

- `app/layout.tsx`  
  Main app shell, global metadata, theme provider, auth provider, and toast setup.

---

## 4) API Routes (`app/api/`)

The app has a large API surface under `app/api/`, grouped by feature.

### General purpose route groups

- `app/api/activity/`  
  Activity feed and user actions tracking.

- `app/api/analytics/`  
  Analytics, event capture, and reporting endpoints.

- `app/api/auth/`  
  Authentication routes and login/session related APIs.

- `app/api/chat/`  
  Chat and messaging endpoints.

- `app/api/ideas/`  
  Idea posting/management for SparkForge.

- `app/api/import/`  
  Data import endpoints.

- `app/api/inquiries/`  
  Contact and inquiry handling.

- `app/api/network/`  
  Connections, follows, and networking operations.

- `app/api/onboarding/`  
  User onboarding flows and profile setup data.

- `app/api/profile/`  
  Profile updates and profile data APIs.

- `app/api/profiles/`  
  Public profile retrieval/search APIs.

- `app/api/security/`  
  Security features such as PIN protection and account security endpoints.

- `app/api/setup/`  
  Setup flows and initialization endpoints.

- `app/api/upload/`  
  Media upload handling for images, avatars, and project assets.

- `app/api/username/`  
  Username validation and availability checks.

### Special API layer

- `pages/api/socket.ts`  
  Legacy or shared API route for Socket.IO wiring and realtime communication support.

---

## 5) Components (`components/`)

This folder contains reusable UI building blocks and feature-specific components.

### General UI components

- `components/ui/`  
  Reusable shadcn-style UI primitives (buttons, dialogs, cards, labels, tabs, etc.).

- `components/providers/auth-provider.tsx`  
  Provides authentication context to the app.

- `components/providers/theme-provider.tsx`  
  Handles theme toggling and theming.

### Portfolio-related components

- `components/PortfolioLivePreview.tsx`  
  Live preview of the portfolio as the user edits it.

- `components/PortfolioMockPreview.tsx`  
  Preview mock for portfolio display and presentation.

- `components/ShareProfile.tsx`  
  Share/profile distribution utilities such as social sharing and QR content.

- `components/PhotoUpload.tsx`  
  Image upload UI for user photos.

- `components/ProjectImageUpload.tsx`  
  Upload component for project gallery images.

- `components/TestimonialAvatarUpload.tsx`  
  Avatar upload for testimonial entries.

### Form and editing components

- `components/MarkdownEditor.tsx`  
  Rich text / markdown editing support for portfolio content.

- `components/MarkdownContent.tsx`  
  Rendering markdown content in the frontend.

- `components/MonthYearPicker.tsx`  
  Date selection utility for experience and project timelines.

- `components/InquiryForm.tsx`  
  Contact/inquiry form used on public profiles.

### Modals and dashboard UI

- `components/modals/`  
  Modal forms for adding/editing certifications, experience, projects, research, and testimonials.

- `components/dashboard/`  
  Dashboard-specific layout and UI blocks.

### SparkForge / public profile UI

- `components/sparkforge/board.tsx`  
  SparkForge board UI for idea cards and collaboration flow.

- `components/public-profile/profile.tsx`  
  Display component for public developer profiles.

---

## 6) Utility and business logic (`lib/`)

This folder holds reusable app logic, helpers, database wrappers, and service integrations.

- `lib/db.ts`  
  Database access layer for user/profile operations and serialization logic.

- `lib/mongodb.ts`  
  MongoDB connection logic and database initialization.

- `lib/auth.ts`  
  Authentication utilities and session/auth configuration.

- `lib/auth-user.ts`  
  Helpers for resolving the authenticated user in app logic.

- `lib/seo.ts`  
  SEO metadata helpers, site URL helpers, and metadata constants.

- `lib/publish.ts`  
  Logic related to publishing or unpublishing a developer profile.

- `lib/profile-customization.ts`  
  Theme, layout, and custom portfolio settings logic.

- `lib/profile-completion.ts`  
  Calculates whether a profile is complete and ready to publish.

- `lib/network.ts`  
  Network/connection logic.

- `lib/activity.ts`  
  Activity tracking and feed generation.

- `lib/chat-events.ts`  
  Chat event constants or event-driven logic.

- `lib/inquiry-captcha.ts`  
  Anti-bot / CAPTCHA logic for inquiry submissions.

- `lib/transactional-email.ts`  
  Email sending and email template logic.

- `lib/smtp.ts`  
  SMTP configuration and mail transport setup.

- `lib/socket-auth.ts`  
  Authentication logic for Socket.IO/realtime features.

- `lib/socket-client.ts` and `lib/socket-server.ts`  
  Client/server realtime communication wiring.

- `lib/popular-tech-skills.ts`  
  Skill/tech stack data used in profile or discovery features.

- `lib/themes.ts`  
  Theme definitions and styling metadata.

- `lib/username.ts`  
  Username generation, validation, normalization.

- `lib/resume-pdf.ts`  
  PDF resume generation utilities.

- `lib/utils.ts`  
  Generic utility functions used throughout the application.

---

## 7) Data Models (`models/`)

This folder contains Mongoose schemas that map directly to MongoDB collections.

- `models/User.ts`  
  User model with auth-related fields, username, onboarding state, and security settings.

- `models/Profile.ts`  
  Main profile model for bio, skills, projects, experience, certifications, social links, and publish state.

- `models/Connection.ts`  
  Network connection records between users.

- `models/Conversation.ts`  
  Messaging conversation model.

- `models/Message.ts`  
  Chat message document model.

- `models/Idea.ts`  
  SparkForge idea/project pitch model.

- `models/Inquiry.ts`  
  Inquiry/contact request model from profile visitors.

- `models/Activity.ts`  
  User activity feed entries.

- `models/AnalyticsEvent.ts`  
  Event tracking for analytics and usage measurement.

---

## 8) Hooks (`hooks/`)

- `hooks/use-site-url.ts`  
  Reads the correct site base URL used in metadata and routing.

- `hooks/use-toast.ts`  
  Helper for consistent toast notification usage.

---

## 9) Type Definitions (`types/`)

- `types/next-auth.ts`  
  Type augmentation for NextAuth session/user objects.

---

## 10) Scripts (`scripts/`)

- `scripts/merge-duplicate-users.js`  
  Script for identifying and merging duplicate user records.

This folder is meant for operational maintenance tasks rather than app runtime logic.

---

## 11) Other Important Files

- `middleware.ts`  
  Central request gate for auth/protection logic.

- `docker-compose.yml`  
  Local database environment provisioning.

- `README.md`  
  High-level documentation for onboarding and product understanding.

---

## 12) Quick Mental Model

If you are new to this codebase, a useful way to understand it is:

- `app/` = user-facing pages and route structure
- `app/api/` = backend endpoints
- `components/` = presentation and reusable UI
- `lib/` = business logic and service integrations
- `models/` = database schemas
- `hooks/` = frontend state helpers
- `types/` = TypeScript typing
- `scripts/` = one-off admin or maintenance tasks

This separation keeps the project organized around Next.js app structure, feature areas, and data responsibilities.

---

## 13) Summary

DevLink is a full-stack Next.js portfolio platform with a clear split between:

- public-facing portfolio pages
- dashboard/editor experiences
- network and messaging features
- idea collaboration (SparkForge)
- database-backed profile data
- auth and route security
- mail/media integrations

The file structure reflects that separation closely, making it easier to work on one feature without affecting unrelated parts of the app.
