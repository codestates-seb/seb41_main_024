import React from 'react';
export interface inputPropsType {
  id: string;
  label: string;
  type?: string;
  endAdornment?: React.ReactNode;
  children?: React.ReactNode;
  select?: boolean;
  defaultValue?: string;
  selectProps: {
    native: boolean;
  };
  rows: number;
  multiline: boolean;
  className: string;
}
