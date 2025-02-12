import { XMarkIcon } from '@heroicons/react/24/outline';

export interface ChipProps extends React.PropsWithChildren {
  onClick?: () => void;
  onRemove?: () => void;
}

export default function Chip({
  onClick,
  onRemove,
  children,
}: ChipProps) {
  return (
    onClick
      ? (
        <button
          type="button"
        >
          {children}
        </button>
      )
      : (
        <div
          className="inline-flex items-center justify-center gap-2 rounded-md text-xs font-medium border border-input bg-transparent p-1"
        >
          {children}
          {
            onRemove && (
              <button
                type="button"
                className="hover:bg-accent hover:text-accent-foreground p-0.5"
                onClick={onRemove}
              >
                <div className="text-16/0">
                  <XMarkIcon className="size-3" />
                </div>
              </button>
            )
          }
        </div>
      )
  );
}
