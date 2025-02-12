import { Input } from '../ui/input';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface TextFieldProps extends Omit<FormFieldLabeledProps, 'children'> {}

export default function TextField({
  ...props
}: TextFieldProps) {
  return (
    <FormFieldLabeled
      {...props}
    >
      {({ field }) => (
        <Input
          {...field}
        />
      )}
    </FormFieldLabeled>
  );
}
