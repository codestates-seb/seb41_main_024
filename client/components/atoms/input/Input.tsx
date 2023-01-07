import { OutlinedInput, TextField } from "@mui/material";
import { inputPropsType } from "./Type_input";

const Input = ({ id, label, type, endAdornment }: inputPropsType) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      InputProps={{ endAdornment }}
    />
  );
};

export default Input;
