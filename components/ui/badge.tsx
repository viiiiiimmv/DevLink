import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[#6366F1] text-white hover:bg-[#4F46E5]',
        secondary:
          'border-[#334155] bg-[#1E293B] text-[#CBD5E1] hover:bg-[#283548]',
        destructive:
          'border-transparent bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
        outline:
          'border-[#334155] text-[#CBD5E1] bg-transparent',
        tech:
          'font-mono text-xs font-medium text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/25',
        success:
          'font-mono text-xs font-medium text-[#10B981] bg-[#10B981]/12 border-[#10B981]/25',
        warning:
          'font-mono text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/12 border-[#F59E0B]/25',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
