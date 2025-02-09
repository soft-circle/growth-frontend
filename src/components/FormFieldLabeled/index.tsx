import {
  ControllerProps,
} from 'react-hook-form';
import { isFunction } from 'lodash';
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';

export interface FormFieldLabeledProps extends Omit<ControllerProps, 'render'> {
  name: string;
  label?: string;
  description?: string;
  children: (renderProps: Parameters<ControllerProps['render']>[0]) => React.ReactNode | React.ReactNode;
}

export default function FormFieldLabeled({
  name,
  label,
  description,
  children,
}: FormFieldLabeledProps) {
  return (
    <FormField
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          {
            label && (
              <Label>
                {label}
              </Label>
            )
          }
          {
            isFunction(children)
              ? children({ field, fieldState, formState })
              : children
          }
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
