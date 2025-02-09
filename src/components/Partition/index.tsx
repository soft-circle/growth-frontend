import { cn } from '@/lib/utils';

interface PartitionProps extends React.PropsWithChildren {
  valign?: 'start' | 'center' | 'end';
  halign?: 'start' | 'center' | 'end';
  space?: number;
  className?: string;
}

const spaceClass: Record<number, string> = {
  0: 'space-x-0',
  1: 'space-x-1',
  2: 'space-x-2',
  3: 'space-x-3',
  4: 'space-x-4',
  5: 'space-x-5',
  6: 'space-x-6',
  7: 'space-x-7',
  8: 'space-x-8',
  9: 'space-x-9',
  10: 'space-x-10',
};

function Partition({
  valign = 'start',
  halign = 'start',
  space = 0,
  className,
  children,
}: PartitionProps) {
  return (
    <div
      className={cn(
        `group flex items-${valign} justify-${halign} ${spaceClass[space]}`,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Main({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={cn('flex-1', className)}>
      {children}
    </div>
  );
}

function Side({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={cn('flex-grow-0', className)}>
      {children}
    </div>
  );
}

export type { PartitionProps };

Partition.Main = Main;
Partition.Side = Side;

export default Partition;
