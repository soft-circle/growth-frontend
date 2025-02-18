import {
  useFieldArray,
  FieldValues,
  FieldArrayPath,
  UseFieldArrayProps,
  UseFieldArrayReturn,
} from 'react-hook-form';

export interface FormFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
>
  extends UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName> {
  children: (
    fieldArray: UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>
  ) => React.ReactNode;
}

export default function FormFieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
>({
  children,
  ...props
}: FormFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>) {
  const fieldArray = useFieldArray<TFieldValues, TFieldArrayName, TKeyName>(props);
  return children(fieldArray);
}
