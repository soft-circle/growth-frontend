import { Input } from '../ui/input';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface TextFieldProps extends
  Omit<FormFieldLabeledProps, 'children'>,
  Omit<React.ComponentProps<'input'>, 'name' | 'defaultValue'> {}

export default function TextField({
  ...props
}: TextFieldProps) {
  return (
    <FormFieldLabeled
      {...props}
    >
      {({ field }) => (
        <Input
          className="bg-white"
          {...props}
          {...field}
        />
      )}
    </FormFieldLabeled>
  );
}
