import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface LogoIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string
  variant?: 'gradient' | 'monochrome' | 'glow' | 'white' | 'dark' | 'auto'
  className?: string
}

export function LogoIcon({
  size = 28,
  variant = 'auto',
  className,
  ...props
}: LogoIconProps) {
  // Numeric size calculation (aspect ratio is 313 / 210 ≈ 1.49)
  const numHeight = typeof size === 'number' ? size : parseInt(size as string, 10) || 28
  const numWidth = Math.round(numHeight * (313 / 210))

  return (
    <div
      style={{ width: numWidth, height: numHeight }}
      className={cn('relative inline-flex items-center justify-center shrink-0 select-none', className)}
      aria-label="DevLink Logo"
      {...props}
    >
      {/* Light mode: dark ink logo */}
      <Image
        src="/logo-dark.png"
        alt="DevLink Logo"
        width={numWidth * 2}
        height={numHeight * 2}
        className={cn(
          'w-full h-full object-contain',
          variant === 'white' ? 'hidden' : 'block dark:hidden'
        )}
        priority
      />
      {/* Dark mode: crisp white logo */}
      <Image
        src="/logo.png"
        alt="DevLink Logo"
        width={numWidth * 2}
        height={numHeight * 2}
        className={cn(
          'w-full h-full object-contain',
          variant === 'white' ? 'block' : 'hidden dark:block'
        )}
        priority
      />
    </div>
  )
}

export interface LogoProps {
  size?: number | string
  iconSize?: number | string
  variant?: 'gradient' | 'monochrome' | 'glow' | 'white' | 'dark' | 'auto'
  showText?: boolean
  href?: string
  className?: string
  textClassName?: string
}

export function Logo({
  iconSize = 24,
  variant = 'auto',
  showText = true,
  href = '/',
  className,
  textClassName,
}: LogoProps) {
  const content = (
    <div className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      <LogoIcon size={iconSize} variant={variant} className="transition-transform duration-200 group-hover:scale-[1.03]" />
      {showText && (
        <span
          className={cn(
            'text-[15px] font-semibold tracking-[-0.02em] text-foreground transition-colors',
            textClassName
          )}
        >
          DevLink
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40 rounded-[4px]"
      >
        {content}
      </Link>
    )
  }

  return content
}

export default Logo
