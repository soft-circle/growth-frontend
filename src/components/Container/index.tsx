interface ContainerProps extends React.PropsWithChildren {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeClasses: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'max-w-full',
};

export default function Container({
  size = 'md',
  children,
}: ContainerProps) {
  return (
    <div className={`${sizeClasses[size]} m-auto px-2`}>
      {children}
    </div>
  );
}
