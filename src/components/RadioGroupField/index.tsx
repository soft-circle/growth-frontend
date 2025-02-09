import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface RadioGroupFieldProps extends Omit<FormFieldLabeledProps, 'children'> {
  options: { value: string, label: string }[];
}

export default function RadioGroupField({
  options,
  ...props
}: RadioGroupFieldProps) {
  return (
    <FormFieldLabeled
      {...props}
    >
      {({ field }) => (
        <RadioGroup
          defaultValue={field.value}
          onValueChange={field.onChange}
        >
          {
            options.map(({ value, label }) => (
              <div
                key={value}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={label}>{label}</Label>
              </div>
            ))
          }
        </RadioGroup>
      )}
    </FormFieldLabeled>
  );
}
