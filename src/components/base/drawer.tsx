// TODO: Shadcn by default adds z-50 to drawer overlay and the drawer content but that causes a nested drawer to not close when clicked outside
'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import { cn } from '@/lib/utils';
import { IconButton } from './icon-button';
import { XIcon } from '@phosphor-icons/react/dist/ssr';
import styles from './drawer.module.css';

function Drawer<T>({ ...props }: DrawerPrimitive.Root.Props<T>) {
  return <DrawerPrimitive.Root data-slot='drawer' {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot='drawer-trigger' {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot='drawer-portal' {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return (
    <DrawerPrimitive.Close
      data-slot='drawer-close'
      render={
        <IconButton variant='transparent' size='lg'>
          <XIcon />
          <span className='sr-only'>Close</span>
        </IconButton>
      }
      {...props}
    />
  );
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot='drawer-overlay'
      className={cn(styles.overlay, className)}
      {...props}
    />
  );
}

type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Popup> & {
  showHandle?: boolean;
  overlayProps?: React.ComponentProps<typeof DrawerPrimitive.Backdrop>;
  portalProps?: React.ComponentProps<typeof DrawerPrimitive.Portal>;
  contentClassName?: string;
};

function DrawerContent({
  className,
  children,
  showHandle = false,
  overlayProps = {},
  portalProps = {},
  contentClassName,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal {...portalProps} data-slot='drawer-portal'>
      <DrawerOverlay {...overlayProps} />
      <DrawerPrimitive.Viewport className={styles.viewport}>
        <DrawerPrimitive.Popup
          data-slot='drawer-content'
          className={cn(
            styles.popup,
            'bg-background-bg-base rounded-t-4xl',
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content
            className={cn(styles.content, contentClassName)}
          >
            {showHandle && (
              <div className='backdrop-blur-xs h-7.5 bg-linear-to-b sticky top-0 z-10 flex shrink-0 items-center justify-center from-white from-25%'>
                <div className='bg-background-bg-switch mx-auto h-1 w-10 shrink-0 rounded-full' />
              </div>
            )}
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='drawer-header'
      className={cn(
        'h-15 flex items-center justify-between border-b py-3.5 pl-6 pr-3.5',
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='drawer-footer'
      className={cn('flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot='drawer-title'
      className={cn('heading-2', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
};
