import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const iconBtnVariants = cva(
  'inline-flex items-center shrink-0 justify-center whitespace-nowrap rounded-full transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-foreground-fg-disabled disabled:border-none [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none disabled:shadow-(--shadow-button-disabled) active:scale-97',
  {
    variants: {
      variant: {
        outline:
          'border bg-component-button-neutral text-foreground-fg-subtle hover:text-foreground-fg-base hover:shadow-(--shadow-button-neutral-hover) focus-visible:text-foreground-fg-base focus-visible:shadow-(--shadow-button-neutral-focused)',
        transparent:
          'text-foreground-fg-subtle hover:text-foreground-fg-base hover:bg-component-button-neutral-hover focus-visible:shadow-(--shadow-button-neutral-focused) disabled:shadow-none disabled:bg-transparent',
        filled:
          'text-foreground-fg-base bg-background-bg-subtle-mid hover:bg-background-bg-subtle-high focus-visible:shadow-(--shadow-button-neutral-focused)',
      },
      size: {
        md: "size-7 [&_svg:not([class*='size-'])]:size-4",
        sm: "size-5 [&_svg:not([class*='size-'])]:size-3",
        lg: "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  },
);

function IconButton({
  className,
  variant = 'outline',
  size = 'md',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof iconBtnVariants>) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn(iconBtnVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { IconButton, iconBtnVariants };
