import { SelectChangeEvent } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler } from 'react';
export type inputType = TextFieldProps & {
  id: string;
  name?: string;
  label?: string;
  type?: string;
  endAdornment?: React.ReactNode;
  children?: React.ReactNode;
  select?: boolean;
  defaultValue?: string;
  selectProps?: {
    native: boolean;
  };
  rows?: number;
  multiline?: boolean;
  className?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: any;
  placeholder?: string;
};
