import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from '../ui/button';

export interface ButtonProps extends Omit<BaseButtonProps, 'variant'> {
  variant?: 'default' | 'outline' | 'link' | 'text';
  fullWidth?: boolean;
}
export default function Button({
  variant,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={fullWidth ? 'w-full' : ''}
      variant={(
        variant === 'outline'
          ? 'outline'
          : variant === 'link'
            ? 'link'
            : variant === 'text'
              ? 'ghost'
              : 'default'
      )}
      {...props}
    />
  );
}
