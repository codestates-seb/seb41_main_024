import React from 'react';
export interface BasicTabsPropsType {
  handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  value: string;
  bgcolor: string;
  color: string;
  borderBottom: number;
  borderColor: string;
}
