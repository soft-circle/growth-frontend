import type {
  LabelProps,
} from '@radix-ui/react-label';
import {
  ControllerProps,
} from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

interface TextFieldProps extends Omit<ControllerProps, 'render'>, Omit<LabelProps, 'defaultValue'> {
  label?: string;
  description?: string;
}

function TextField({
  name,
  label,
  description,
  ...props
}: TextFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {
            label && (
              <Label {...props}>
                {label}
              </Label>
            )
          }
          <Input {...field} />
          {
            description && (
              <FormDescription>
                {description}
              </FormDescription>
            )
          }
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export type { TextFieldProps };

export default TextField;
