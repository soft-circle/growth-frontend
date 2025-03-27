import FormField, {
  FormFieldProps,
} from '@/components/FormField';
import { Input } from '@/components/ui/input';

export interface TextFieldProps extends
  Omit<FormFieldProps, 'children'>,
  Omit<React.ComponentProps<'input'>, 'name' | 'defaultValue'> {}

export default function TextField({
  name,
  defaultValue,
  rules,
  shouldUnregister,
  control,
  disabled,
  ...props
}: TextFieldProps) {
  return (
    <FormField
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      control={control}
      disabled={disabled}
      {...props}
    >
      {({ field }) => (
        <Input
          className="bg-white"
          {...props}
          {...field}
        />
      )}
    </FormField>
  );
}
