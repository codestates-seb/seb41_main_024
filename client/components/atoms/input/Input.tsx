import React from 'react';
import { TextField } from '@mui/material';

const Input = ({
  endAdornment,
  children,
  select,
  multiline,
  className,
  value,
  onChange,
  required,
  ...props
}: any) => {
  return (
    <TextField
      {...props}
      {...(select ? { select: true } : null)}
      {...(multiline ? { multiline: true } : null)}
      className={className}
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment }}
      required={required}
    >
      {children}
    </TextField>
  );
};

export default Input;
