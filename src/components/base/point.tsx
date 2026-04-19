import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default function Point({ className }: Props) {
  return (
    <span
      className={cn(
        'bg-foreground-fg-disabled inline-block size-0.5 shrink-0 rounded-full',
        className,
      )}
    />
  );
}
