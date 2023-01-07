import { OutlinedInput, TextField } from "@mui/material";
import { inputPropsType } from "./Type_input";

const Input = ({
  id,
  label,
  type,
  endAdornment,
  children,
  select,
  defaultValue,
  selectProps,
}: inputPropsType) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      InputProps={{ endAdornment }}
      {...(select ? { select: true } : null)}
      defaultValue={defaultValue}
      SelectProps={selectProps}
    >
      {children}
    </TextField>
  );
};

export default Input;
