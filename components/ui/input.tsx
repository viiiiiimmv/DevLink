import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#1E293B] px-3.5 py-2 text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-[#475569] transition-colors duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-900 dark:file:text-[#F8FAFC] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/25 focus-visible:outline-none focus-visible:border-[#6366F1] focus-visible:ring-2 focus-visible:ring-[#6366F1]/25 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20 focus-visible:border-[#EF4444] focus-visible:ring-[#EF4444]/20',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : props['aria-invalid']}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
