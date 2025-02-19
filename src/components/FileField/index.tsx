import { useRef, useState } from 'react';
import { uniqBy } from 'lodash';
import TextBlock from '../TextBlock';
import FormFieldLabeled, {
  FormFieldLabeledProps,
} from '../FormFieldLabeled';

export interface FileFieldProps extends
  Omit<React.ComponentProps<'input'>, 'name' | 'value' | 'onChange' | 'defaultValue' | 'type'>,
  Omit<FormFieldLabeledProps, 'children'> {}

export default function FileField({
  multiple,
  placeholder = 'Drag & Drop file',
  ...props
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stateFiles, setStateFiles] = useState<File[]>([]);
  return (
    <FormFieldLabeled
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
                  onChange={(e) => {
                    const { files } = e.target;
                    if (!files || files?.length === 0) return;
                    const newFiles = (
                      multiple
                        ? uniqBy([...stateFiles, ...Array.from(files)], 'name')
                        : Array.from(files)
                    );
                    setStateFiles(newFiles);
                    field.onChange(multiple ? newFiles : newFiles[0]);
                    // reset input value
                    e.target.value = '';
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
              stateFiles.map((file) => (
                <div key={file.name}>
                  {
                    file.type.includes('image')
                      ? (
                        <img
                          src={URL.createObjectURL(file)}
                          width={100}
                          height={100}
                          alt="preview"
                        />
                      )
                      : file.name
                  }
                </div>
              ))
            }
          </>
        );
      }}
    </FormFieldLabeled>
  );
}
