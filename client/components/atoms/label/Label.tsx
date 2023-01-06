import InputLabel from "@mui/material/InputLabel";
import { labelPropsType } from "./Type_label";
const Label = ({ htmlFor, LabelName }: labelPropsType) => {
  return <InputLabel htmlFor={htmlFor}>{LabelName}</InputLabel>;
};

export default Label;
