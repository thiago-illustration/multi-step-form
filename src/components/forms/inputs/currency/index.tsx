import { TextInput, TextInputProps } from "../text";

export const CurrencyInput = (props: TextInputProps) => (
  <TextInput {...props} placeholder="$" mask="currency" />
);
