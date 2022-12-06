import { useFormContext, Controller } from "react-hook-form";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

type Props = {
  label: string;
  name: string;
  optional?: boolean;
};

export const CheckboxInput = ({ name, label, optional }: Props) => {
  const { formState, control } = useFormContext();
  const { errors, defaultValues } = formState;

  const error = errors[name];
  const defaultValue = defaultValues ? defaultValues[name] : false;

  return (
    <FormControl
      required={!optional}
      error={!!error}
      component="fieldset"
      variant="standard"
    >
      <FormControlLabel
        control={
          <Controller
            defaultValue={defaultValue}
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
        }
        label={label}
      />
      {!!error && <FormHelperText>{error.message as string}</FormHelperText>}
    </FormControl>
  );
};
