import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  variant?: 'gradient' | 'monochrome' | 'glow' | 'white'
  idPrefix?: string
}

export function LogoIcon({
  size = 28,
  variant = 'gradient',
  idPrefix = 'dl-logo',
  className,
  ...props
}: LogoIconProps) {
  const gradientId = `${idPrefix}-grad`
  const glowId = `${idPrefix}-glow`

  const getStroke = () => {
    switch (variant) {
      case 'monochrome':
        return 'currentColor'
      case 'white':
        return '#FFFFFF'
      case 'gradient':
      case 'glow':
      default:
        return `url(#${gradientId})`
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 transition-transform duration-300', className)}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="45%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        {variant === 'glow' && (
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>
      <path
        d="M 18 14 H 58 A 11 11 0 0 1 58 36 H 38 A 11 11 0 0 0 38 58 H 64 L 82 76 L 64 94"
        stroke={getStroke()}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={variant === 'glow' ? `url(#${glowId})` : undefined}
      />
    </svg>
  )
}

interface LogoProps {
  size?: number | string
  iconSize?: number | string
  variant?: 'gradient' | 'monochrome' | 'glow' | 'white'
  showText?: boolean
  href?: string
  className?: string
  textClassName?: string
}

export function Logo({
  iconSize = 28,
  variant = 'gradient',
  showText = true,
  href = '/',
  className,
  textClassName,
}: LogoProps) {
  const content = (
    <div className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      <div className="relative flex items-center justify-center">
        {/* Subtle ambient halo on hover */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#6366F1]/20 to-[#06B6D4]/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
        <LogoIcon size={iconSize} variant={variant} className="relative transition-transform duration-300 group-hover:scale-105" />
      </div>
      {showText && (
        <span
          className={cn(
            'text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary',
            textClassName
          )}
        >
          Dev<span className="text-[#6366F1] dark:text-[#818CF8]">Link</span>
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        {content}
      </Link>
    )
  }

  return content
}

export default Logo
