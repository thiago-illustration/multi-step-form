import { Input, MultiStepForm } from "ui/components";

export const PropertyInfo = () => (
  <div>
    <Input.Text name="address" label="Address" />
    <Input.Text name="city" label="City" />
    <Input.Text name="state" label="State" />
    <Input.Text name="zipcode" label="Zip Code" optional />

    <MultiStepForm.Footer requiredFields={["address", "city", "state"]} />
  </div>
);
