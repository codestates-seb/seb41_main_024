import { TextField } from "@mui/material";
import { inputPropsType } from "./Type_input";

const Input = ({ id, label, variant }: inputPropsType) => {
  return <TextField id={id} label={label} variant={variant} />;
};

export default Input;
