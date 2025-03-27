import { isFunction } from 'lodash';
import {
  ControllerProps,
  FieldPath,
} from 'react-hook-form';

import {
  FormDescription,
  FormField as BaseFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface FormFieldProps<
  TValue = string,
  TName extends FieldPath<Record<string, TValue>> = FieldPath<Record<string, TValue>>,
> extends Omit<ControllerProps<Record<string, TValue>, TName>, 'render'> {
  label?: string;
  description?: string;
  children: (renderProps: Parameters<ControllerProps<Record<string, TValue>, TName>['render']>[0]) => React.ReactNode | React.ReactNode;
}

export default function FormField<
  TValue = string,
  TName extends FieldPath<Record<string, TValue>> = FieldPath<Record<string, TValue>>,
>({
  name,
  label,
  description,
  children,
}: FormFieldProps<TValue, TName>) {
  return (
    <BaseFormField<Record<string, TValue>, TName>
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          {
            label && (
              <FormLabel>
                {label}
              </FormLabel>
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
