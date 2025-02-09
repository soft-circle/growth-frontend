import type {
  LabelProps,
} from '@radix-ui/react-label';

import { Label } from '../ui/label';

interface FieldLabelProps extends LabelProps {}

export default function FieldLabel({
  children,
  ...props
}: FieldLabelProps) {
  return (
    <Label {...props}>
      {children}
    </Label>
  );
}
