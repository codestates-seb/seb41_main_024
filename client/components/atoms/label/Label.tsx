import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { labelType } from './labelType';

const Label = ({ htmlFor, labelText }: labelType) => {
  return (
    <InputLabel className="text-xs mb-3.5" htmlFor={htmlFor}>
      {labelText}
    </InputLabel>
  );
};

export default Label;
