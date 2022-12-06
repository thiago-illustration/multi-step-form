import { TextInput, TextInputProps } from "../text";

export const PhoneInput = (props: TextInputProps) => (
  <TextInput
    type="tel"
    mask="phone"
    inputMode="numeric"
    autoComplete="cc-number"
    {...props}
  />
);
