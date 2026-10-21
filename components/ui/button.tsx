import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D16] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[#6366F1] text-white hover:bg-[#4F46E5] active:bg-[#4338CA] shadow-sm',
        secondary:
          'bg-transparent border border-[#334155] hover:bg-[#1E293B] text-[#E2E8F0] active:bg-[#283548]',
        destructive:
          'bg-transparent border border-transparent text-[#EF4444] hover:bg-[#EF4444]/12 active:bg-[#EF4444]/20',
        outline:
          'border border-[#334155] bg-transparent hover:bg-[#1E293B] text-[#E2E8F0] active:bg-[#283548]',
        ghost:
          'bg-transparent hover:bg-[#283548] text-[#CBD5E1] hover:text-[#F8FAFC]',
        link:
          'text-[#06B6D4] underline-offset-4 hover:underline hover:text-[#06B6D4]/80 p-0 h-auto',
      },
      size: {
        default: 'h-10 px-[18px] py-[10px]',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
