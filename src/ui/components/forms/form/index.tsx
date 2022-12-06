import { PropsWithChildren } from "react";

import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

export type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<FieldValues>;
  methods: UseFormReturn<T, any>;
};

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: PropsWithChildren<FormProps<T>>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
