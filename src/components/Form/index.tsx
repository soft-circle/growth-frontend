import {
  FormProvider,
  useForm,
  FieldValues,
  UseFormProps,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { isFunction } from 'lodash';

interface FormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  onSubmit?: SubmitHandler<TFieldValues>;
  children: (form: UseFormReturn<TFieldValues>) => React.ReactNode | React.ReactNode;
}

function Form<TFieldValues extends FieldValues>({
  onSubmit,
  children,
  ...props
}: FormProps<TFieldValues>) {
  const form = useForm({
    ...props,
  });
  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
      >
        {
          isFunction(children)
            ? children(form)
            : children
        }
      </form>
    </FormProvider>
  );
}

export type { FormProps };

export default Form;
