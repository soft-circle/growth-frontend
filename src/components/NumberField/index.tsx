import { Input } from '../ui/input';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface NumberFieldProps extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'name'>, Omit<FormFieldLabeledProps, 'children'> {}

export default function NumberField({
  ...props
}: NumberFieldProps) {
  return (
    <FormFieldLabeled
      {...props}
    >
      {({ field }) => (
        <Input
          {...props}
          {...field}
          value={field.value.replace(/[^0-9]/g, '')}
        />
      )}
    </FormFieldLabeled>
  );
}
