import { useId, InputHTMLAttributes } from "react";
import { useFormContext, Controller } from "react-hook-form";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { masks } from "../../masks";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  optional?: boolean;
  mask?: keyof typeof masks;
  before?: () => React.ReactElement;
  after?: () => React.ReactElement;
};

export const TextInput = ({
  name,
  label,
  optional,
  mask,
  type,
  before,
  after,
}: TextInputProps) => {
  const id = useId();
  const { formState, control } = useFormContext();
  const { errors, defaultValues } = formState;

  const error = errors[name];
  const defaultValue = defaultValues ? defaultValues[name] : "";

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl required={!optional} error={!!error}>
          <InputLabel shrink htmlFor={id}>
            {label}
          </InputLabel>

          <Input
            {...field}
            sx={{
              border: "1px solid green",
              borderRadius: "4px",
              ":after": {
                display: "none",
              },
              ":before": {
                display: "none",
              },
            }}
            id={id}
            type={type}
            onChange={(e) => field.onChange(mask ? masks[mask](e) : e)}
            startAdornment={
              before && (
                <InputAdornment position="start">{before()}</InputAdornment>
              )
            }
            endAdornment={
              after && <InputAdornment position="end">{after()}</InputAdornment>
            }
          />

          {!!error && (
            <FormHelperText sx={{ color: "red" }}>
              {error.message as string}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
