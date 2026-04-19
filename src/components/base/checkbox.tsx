'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'data-checked:bg-interactive-bg-interactive data-checked:focus-visible:shadow-border-interactive-focus data-checked:text-foreground-fg-on-color data-checked:shadow-border-interactive-shadow aria-invalid:shadow-border-error shadow-border-base group-has-disabled/field:opacity-50 focus-visible:shadow-border-interactive-focus peer relative flex size-3.5 shrink-0 items-center justify-center rounded-full transition-shadow disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='grid size-full place-content-center text-current transition-none'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
        >
          <path
            d='M2.37503 5.4375L4.06253 7.625L7.62503 2.375'
            stroke='white'
            strokeWidth='1.225'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
