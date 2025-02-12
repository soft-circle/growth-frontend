import {
  ToggleGroup,
  ToggleGroupItem,
} from '../ui/toggle-group';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface ToggleGroupFieldProps extends Omit<FormFieldLabeledProps, 'children'> {
  options: { value: string, label: string }[];
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  multiple?: boolean;
  fitted?: boolean;
}

export default function ToggleGroupField({
  options,
  variant,
  size,
  multiple,
  fitted,
  ...props
}: ToggleGroupFieldProps) {
  return (
    <FormFieldLabeled
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
    </FormFieldLabeled>
  );
}
