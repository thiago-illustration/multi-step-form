import { useFormContext } from "react-hook-form";
import { MultiStepForm } from "ui/components";

export const Confirmation = () => {
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

      <MultiStepForm.Footer />
    </div>
  );
};
