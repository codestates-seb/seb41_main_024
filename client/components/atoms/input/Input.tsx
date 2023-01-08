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
  rows,
  multiline,
  className
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
      rows={rows}
      {...(multiline ? { multiline: true } : null)}
      className={className}
    >
      {children}
    </TextField>
  );
};

export default Input;
