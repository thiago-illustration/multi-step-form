import { useCallback } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

import { MultiStep, MultiStepProps, useMultiStep } from "../../multi-step";
import { Form as FormComponent, FormProps } from "../form";

function Form<T extends FieldValues>({
  methods,
  steps,
  onSubmit,
}: MultiStepProps & FormProps<T>) {
  return (
    <FormComponent<T> methods={methods} onSubmit={onSubmit}>
      <MultiStep steps={steps} />
    </FormComponent>
  );
}

const Footer = ({ requiredFields = [] }: { requiredFields?: string[] }) => {
  const { isFirstStep, isLastStep, goNext, goPrev } = useMultiStep();
  const { trigger, watch, formState } = useFormContext();

  const isNextEnabled =
    requiredFields.filter((field) => watch(field)).length ===
    requiredFields.length;

  const handleNext = useCallback(async () => {
    const isValid = await trigger(requiredFields);
    if (!isValid) return;
    goNext();
  }, [trigger, goNext, requiredFields]);

  return (
    <footer>
      {!isFirstStep && <button onClick={goPrev}>Prev</button>}
      {isLastStep ? (
        <button type="submit">
          {formState.isSubmitting ? "Loading..." : "Submit"}
        </button>
      ) : (
        <button onClick={handleNext} disabled={!isNextEnabled}>
          Next
        </button>
      )}
    </footer>
  );
};

export const MultiStepForm = {
  Form,
  Footer,
};
