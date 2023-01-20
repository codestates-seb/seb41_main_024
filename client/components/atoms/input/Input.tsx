import React from 'react';
import { TextField } from '@mui/material';
import { inputType } from './inputType';

const Input = ({
  endAdornment,
  children,
  select,
  multiline,
  ...props
}: inputType) => {
  return (
    <TextField
      {...props}
      {...(select ? { select: true } : null)}
      {...(multiline ? { multiline: true } : null)}
      InputProps={{ endAdornment }}
    >
      {children}
    </TextField>
  );
};

export default Input;
