import Chip from '@/components/Chip';
import FormField, {
  FormFieldProps,
} from '@/components/FormField';

import { Input } from '../ui/input';

export interface ChipsTextFieldProps extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'name'>, Omit<FormFieldProps<string[]>, 'children'> {}

export default function ChipsTextField({
  placeholder = '키워드 입력 후 엔터',
  ...props
}: ChipsTextFieldProps) {
  return (
    <FormField<string[]>
      {...props}
    >
      {({ field }) => {
        const { value = [], onChange, ...fieldProps } = field;
        return (
          <div
            className="flex gap-x-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            {
              value.length > 0 && (
                <div
                  className="gap-x-1 flex flex-nowrap items-center max-w-4/5"
                >
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
              )
            }
            <Input
              {...fieldProps}
              className="border-none focus-visible:ring-0 px-0 py-0 h-full shadow-none"
              placeholder={value.length === 0 ? placeholder : ''}
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
          </div>
        );
      }}
    </FormField>
  );
}
