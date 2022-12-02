import { useMemo, useEffect, PropsWithChildren } from "react";

import {
  FormProvider,
  useForm,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

type Props = {
  defaultValues?: any;
  schema: ZodType;
  onSubmit: SubmitHandler<FieldValues>;
};

export function Form({
  children,
  onSubmit,
  defaultValues,
  schema,
}: PropsWithChildren<Props>) {
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
    resolver: useMemo(() => schema && zodResolver(schema), [schema]),
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods.reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
