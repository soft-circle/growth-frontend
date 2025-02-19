import { Input } from '../ui/input';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface NumberFieldProps extends
  Omit<React.ComponentProps<'input'>, 'defaultValue' | 'name'>,
  Omit<FormFieldLabeledProps<number>, 'children'> {}

export default function NumberField({
  ...props
}: NumberFieldProps) {
  return (
    <FormFieldLabeled<number>
      {...props}
    >
      {({ field }) => (
        <Input
          className="bg-white"
          {...props}
          {...field}
          value={field.value ? Number(`${field.value}`.replace(/[^0-9]/g, '')) : ''}
        />
      )}
    </FormFieldLabeled>
  );
}
