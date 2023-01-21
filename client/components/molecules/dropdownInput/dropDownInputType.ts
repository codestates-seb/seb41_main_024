import React from 'react';
import { FormControlProps } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

export interface dropDownInputType extends FormControlProps {
  id: string;
  label: string;
  dropDownOptions: { label: string; value: string | number }[];
  width: string;
  value: string | number;
  defaultValue?: any;
  onchange?: any;
  name?: string;
}
