import React from 'react';
import { TextFieldProps } from '@mui/material';

export interface dropDownInputType {
  id: string;
  label: any;
  dropDownOptions: { label: any; value: any }[];
  width: string;
  value: any;
  defaultValue?: any;
  onchange?: any;
  name?: string;
  props: TextFieldProps;
}
export interface dropDownOptions {
  options: { value: any; label: any };
}
