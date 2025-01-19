import {
  FormProvider,
  useForm,
  FieldValues,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form';

interface FormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  onSubmit?: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
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
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export type { FormProps };

export default Form;
