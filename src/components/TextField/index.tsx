import { Input } from '../ui/input';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface TextFieldProps extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'name'>, Omit<FormFieldLabeledProps, 'children'> {}

export default function TextField({
  ...props
}: TextFieldProps) {
  return (
    <FormFieldLabeled
      {...props}
    >
      {({ field }) => (
        <Input
          {...props}
          {...field}
        />
      )}
    </FormFieldLabeled>
  );
}
