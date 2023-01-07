import { OutlinedInput } from "@mui/material";
import { inputPropsType } from "./Type_input";

const Input = ({ id, label, type, endAdornment }: inputPropsType) => {
  return (
    <OutlinedInput
      id={id}
      label={label}
      type={type}
      endAdornment={endAdornment}
    />
  );
};

export default Input;
