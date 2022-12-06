import { Input, MultiStepForm } from "ui/components";

export const ClientInfo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <Input.Text name="name" label="Name" />
    <Input.Email name="email" label="Email" />
    <Input.Phone name="phone" label="Phone" optional />
    <Input.Date name="date" label="Date" />
    <Input.Currency name="currency" label="Currency" />
    <Input.Text name="lastName" label="Last Name" />
    <Input.Checkbox name="accept" label="Do you accept our terms?" />

    <MultiStepForm.Footer
      requiredFields={["name", "email", "lastName", "accept"]}
    />
  </div>
);
