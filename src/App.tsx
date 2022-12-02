import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { Form, Input, MultiStep, useMultiStep } from "./components";

const FormFooter = ({ requiredFields = [] }: { requiredFields?: string[] }) => {
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

const Step1 = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <Input.Text name="name" label="Name" />
    <Input.Email name="email" label="Email" />
    <Input.Phone name="phone" label="Phone" optional />
    <Input.Date name="date" label="Date" />
    <Input.Currency name="currency" label="Currency" />
    <Input.Text name="lastName" label="Last Name" />
    <Input.Checkbox name="accept" label="Do you accept our terms?" />

    <FormFooter requiredFields={["name", "email", "lastName", "accept"]} />
  </div>
);

const Step2 = () => (
  <div>
    <Input.Text name="address" label="Address" />
    <Input.Text name="city" label="City" />
    <Input.Text name="state" label="State" />
    <Input.Text name="zipcode" label="Zip Code" optional />

    <FormFooter requiredFields={["address", "city", "state"]} />
  </div>
);

const Step3 = () => {
  const { getValues } = useFormContext();
  const { name, lastName, accept, address, city, state } = getValues();

  return (
    <div>
      <p>Step 3</p>
      <p>Name: {name}</p>
      <p>Last Name: {lastName}</p>
      <p>Accept: {accept ? "Accepted" : "Not Accepted"}</p>
      <p>Address: {address}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>

      <FormFooter />
    </div>
  );
};

const App = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    accept: z.boolean({ required_error: "Accept is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zipcode: z.string().optional(),
  });

  const steps = [
    { title: "Step 1", render: () => <Step1 /> },
    { title: "Step 2", render: () => <Step2 /> },
    { title: "Step 3", render: () => <Step3 /> },
  ];

  return (
    <Form
      schema={schema}
      onSubmit={async (values) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("submitting", values);
            resolve(true);
            window.location.pathname = "/";
          }, 2000);
        });
      }}
    >
      <MultiStep steps={steps} />
    </Form>
  );
};

export default App;
