import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-[3px] border px-2 py-0.5 text-[11px] font-mono font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-foreground text-background',
        secondary:
          'border-border bg-secondary text-secondary-foreground',
        destructive:
          'border-destructive/30 bg-destructive/10 text-destructive',
        outline:
          'border-border text-foreground bg-transparent',
        tech:
          'font-mono text-[10px] font-medium text-foreground bg-muted border-border',
        success:
          'font-mono text-[10px] font-medium text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        warning:
          'font-mono text-[10px] font-medium text-amber-500 bg-amber-500/10 border-amber-500/20',
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
