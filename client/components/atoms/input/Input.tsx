import React from 'react';
import { TextField } from '@mui/material';
import { inputType } from './inputType';

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
  onChange,
  placeholder,
}: inputType) => {
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
      placeholder={placeholder}
    >
      {children}
    </TextField>
  );
};

export default Input;
