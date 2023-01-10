import InputLabel from '@mui/material/InputLabel';
import { labelPropsType } from './Type_label';
const Label = ({ htmlFor, labelText }: labelPropsType) => {
  return <InputLabel htmlFor={htmlFor}>{labelText}</InputLabel>;
};

export default Label;
