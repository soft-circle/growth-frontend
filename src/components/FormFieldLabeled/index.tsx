import {
  ControllerProps,
  FieldPath,
} from 'react-hook-form';
import { isFunction } from 'lodash';
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';

export interface FormFieldLabeledProps<
  TValue = string,
  TName extends FieldPath<Record<string, TValue>> = FieldPath<Record<string, TValue>>,
> extends Omit<ControllerProps<Record<string, TValue>, TName>, 'render'> {
  label?: string;
  description?: string;
  children: (renderProps: Parameters<ControllerProps<Record<string, TValue>, TName>['render']>[0]) => React.ReactNode | React.ReactNode;
}

export default function FormFieldLabeled<
  TValue = string,
  TName extends FieldPath<Record<string, TValue>> = FieldPath<Record<string, TValue>>,
>({
  name,
  label,
  description,
  children,
}: FormFieldLabeledProps<TValue, TName>) {
  return (
    <FormField<Record<string, TValue>, TName>
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
