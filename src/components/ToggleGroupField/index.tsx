import FormField, {
  FormFieldProps,
} from '@/components/FormField';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';

export interface ToggleGroupFieldProps extends Omit<FormFieldProps<string | string[] | undefined>, 'children'> {
  options: { value: string, label: string }[];
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  fitted?: boolean;
  multiple?: boolean;
}

export default function ToggleGroupField({
  name,
  defaultValue,
  rules,
  shouldUnregister,
  control,
  disabled,
  options,
  variant,
  size,
  multiple,
  fitted,
  ...props
}: ToggleGroupFieldProps) {
  return (
    <FormField<string | string[] | undefined>
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      control={control}
      disabled={disabled}
      {...props}
    >
      {({ field }) => (
        <ToggleGroup
          type={multiple ? 'multiple' : 'single'}
          defaultValue={field.value}
          onValueChange={field.onChange}
        >
          {
            options.map(({ value, label }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                variant={variant}
                size={size}
                className={fitted ? 'flex-1' : ''}
              >
                {label}
              </ToggleGroupItem>
            ))
          }
        </ToggleGroup>
      )}
    </FormField>
  );
}
