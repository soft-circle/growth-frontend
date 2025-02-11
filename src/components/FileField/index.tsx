import { useRef } from 'react';
import TextBlock from '../TextBlock';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface FileFieldProps extends
  Omit<React.ComponentProps<'input'>, 'name' | 'defaultValue' | 'type'>,
  Omit<FormFieldLabeledProps, 'children'> {}

export default function FileField({
  multiple,
  placeholder = 'Drag & Drop file',
  ...props
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <FormFieldLabeled
      defaultValue={multiple ? [] : ''}
      {...props}
    >
      {({ field }) => {
        const {
          value,
          onChange,
          ref,
          ...fieldProps
        } = field;
        return (
          <>
            <div
              className="border border-dashed border-gray-300 h-150 w-full p-2 flex flex-col justify-center align-center"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              onDragEnter={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                const { files } = e.dataTransfer || {};
                if (!files || files?.length === 0) return;
                field.onChange(multiple ? Array.from(files) : files[0]);
              }}
            >
              <div
                style={{ height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}
              >
                <input
                  type="file"
                  value={multiple ? values : value[0]}
                  onChange={(e) => {
                    const { files } = e.target;
                    if (!files || files?.length === 0) return;
                    field.onChange(multiple ? Array.from(files) : files[0]);
                  }}
                  multiple={multiple}
                  ref={(ele) => {
                    inputRef.current = ele;
                    ref(ele);
                  }}
                  {...fieldProps}
                  {...props}
                />
              </div>
              <TextBlock align="center">
                {placeholder}
              </TextBlock>
              <TextBlock align="center">
                or
              </TextBlock>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                Choose file
              </button>
            </div>
            {
              (
                multiple
                  ? value || []
                  : value ? [value] : []
              ).map((v) => (
                <div>
                  {v.name}
                </div>
              ))
            }
          </>
        );
      }}
    </FormFieldLabeled>
  );
}
