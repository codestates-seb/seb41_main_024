import InputLabel from '@mui/material/InputLabel';
import { labelPropsType } from './Type_label';
const Label = ({ htmlFor, labelText }: labelPropsType) => {
  return (
    <InputLabel className="text-xs mb-3.5" htmlFor={htmlFor}>
      {labelText}
    </InputLabel>
  );
};

export default Label;
