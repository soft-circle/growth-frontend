import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from '../ui/button';

export interface ButtonProps extends BaseButtonProps {
  fullWidth?: boolean;
}
export default function Button({
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={fullWidth ? 'w-full' : ''}
      {...props}
    />
  );
}
