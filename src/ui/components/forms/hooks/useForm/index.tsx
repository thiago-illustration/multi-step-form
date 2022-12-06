import { useEffect } from "react";
import { FieldValues, useForm as useRHF, UseFormProps } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

type Props<T extends FieldValues = FieldValues> = UseFormProps<T> & {
  schema: ZodType;
};

export function useForm<T extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  ...props
}: Props<T>) {
  const methods = useRHF<T>({
    defaultValues,
    resolver: schema && zodResolver(schema),
    reValidateMode: "onBlur",
    ...props,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods.reset]);

  return methods;
}
