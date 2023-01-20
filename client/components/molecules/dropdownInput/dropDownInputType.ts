import React from 'react';
import { TextFieldProps } from '@mui/material';

export interface dropDownInputType {
  id: string;
  label: string;
  dropDownOptions: { label: string; value: string | number }[];
  width: string;
  value: string | number;
  defaultValue?: any;
  onchange?: any;
  name?: string;
  props: TextFieldProps;
}
export interface dropDownOptions {
  options: { value: string | number; label: string };
}
