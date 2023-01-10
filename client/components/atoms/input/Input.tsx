import { OutlinedInput, TextField } from '@mui/material';
import { inputPropsType } from './Type_input';

const Input = ({
  id,
  name,
  label,
  type,
  endAdornment,
  children,
  select,
  defaultValue,
  selectProps,
  rows,
  multiline,
  className,
  value,
  onChange
}: inputPropsType) => {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={type}
      InputProps={{ endAdornment }}
      {...(select ? { select: true } : null)}
      defaultValue={defaultValue}
      SelectProps={selectProps}
      rows={rows}
      {...(multiline ? { multiline: true } : null)}
      className={className}
      value={value}
      onChange={onChange}
    >
      {children}
    </TextField>
  );
};

export default Input;
