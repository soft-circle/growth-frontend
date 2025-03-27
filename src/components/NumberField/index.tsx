import { isNumber, isNil } from 'lodash';

import FormField, {
  FormFieldProps,
} from '@/components/FormField';
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@/components/Icon';
import { Input } from '@/components/ui/input';

export interface NumberFieldProps extends
  Omit<React.ComponentProps<'input'>, 'name' | 'defaultValue'>,
  Omit<FormFieldProps<number>, 'children'> {
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberField({
  name,
  defaultValue,
  rules,
  shouldUnregister,
  control,
  disabled,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  ...props
}: NumberFieldProps) {
  return (
    <FormField
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      control={control}
      disabled={disabled}
      {...props}
    >
      {({ field }) => (
        <div className="relative">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            className="bg-white"
            {...props}
            {...field}
            value={isNil(field.value) ? '' : field.value}
          />
          <div className="absolute top-0 bottom-0 right-0 flex flex-col m-px">
            <button
              type="button"
              className="group block flex-1 px-1 border-l border-gray-200 rounded-tr-md hover:bg-accent disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
              disabled={isNumber(max) && (field.value || 0) >= max}
              onClick={() => {
                field.onChange((field.value || 0) + step);
              }}
            >
              <ChevronUpIcon
                className="!size-3 group-disabled:[&_path]:stroke-gray-400"
              />
            </button>
            <div className="h-px bg-gray-200" />
            <button
              type="button"
              className="group block flex-1 px-1 border-l border-gray-200 rounded-br-md hover:bg-accent disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
              disabled={isNumber(min) && (field.value || 0) <= min}
              onClick={() => {
                field.onChange((field.value || 0) - step);
              }}
            >
              <ChevronDownIcon
                className="!size-3 group-disabled:[&_path]:stroke-gray-400"
              />
            </button>
          </div>
        </div>
      )}
    </FormField>
  );
}
