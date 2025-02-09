export interface TextBlockProps extends React.PropsWithChildren {
  typography?: 'body.xs' | 'body.sm' | 'body.md' | 'body.lg' | 'heading.xs' | 'heading.sm' | 'heading.md' | 'heading.lg' | 'heading.xl';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const typographyClassNames: Record<NonNullable<TextBlockProps['typography']>, string> = {
  'body.xs': 'text-xs',
  'body.sm': 'text-sm',
  'body.md': 'text-base',
  'body.lg': 'text-lg',
  'heading.xs': 'text-2xl',
  'heading.sm': 'text-3xl',
  'heading.md': 'text-4xl',
  'heading.lg': 'text-5xl',
  'heading.xl': 'text-6xl',
};

const weightClassNames: Record<NonNullable<TextBlockProps['weight']>, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semiBold: 'font-semibold',
  bold: 'font-bold',
};

export default function TextBlock({
  typography = 'body.md',
  weight = 'medium',
  children,
}: TextBlockProps) {
  return (
    <div className={`${typographyClassNames[typography]} ${weightClassNames[weight]}`}>
      {children}
    </div>
  );
}
