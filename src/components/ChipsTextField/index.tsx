import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';
import Chip from '../Chip';
import { Input } from '../ui/input';

export interface ChipsTextFieldProps extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'name'>, Omit<FormFieldLabeledProps<string[]>, 'children'> {}

export default function ChipsTextField({
  placeholder = '키워드 입력 후 엔터',
  ...props
}: ChipsTextFieldProps) {
  return (
    <FormFieldLabeled<string[]>
      {...props}
    >
      {({ field }) => {
        const { value = [], onChange, ...fieldProps } = field;
        return (
          <div>
            <Input
              {...fieldProps}
              placeholder={placeholder}
              onKeyDown={(e) => {
                const inputEle = e.target as HTMLInputElement;
                if (e.code === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  e.stopPropagation();
                  const newValue = [...value, inputEle.value];
                  onChange(newValue);
                  inputEle.value = '';
                }
              }}
            />
            <div className="mt-1 gap-x-1 flex">
              {
                value.map((v, i) => (
                  <Chip
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${v}-${i}`}
                    onRemove={() => {
                      const newValue = value.filter((_v) => _v !== v);
                      onChange(newValue);
                    }}
                  >
                    {v}
                  </Chip>
                ))
              }
            </div>
          </div>
        );
      }}
    </FormFieldLabeled>
  );
}
