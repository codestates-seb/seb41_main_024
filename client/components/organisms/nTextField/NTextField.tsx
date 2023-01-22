import * as React from 'react';
import { TextField } from '@mui/material';
import { nTextFieldType } from './nTextFieldType';

const NTextField = ({
  id,
  type,
  label,
  value,
  disabled,
  onChange,
}: nTextFieldType) => {
  return (
    <div className="pb-[0.875rem] last:pb-0">
      <TextField
        className="w-full"
        type={type}
        id={id}
        label={label}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      <em className="block pt-[0.2rem] px-[0.3rem] text-xs text-[#666]">
        test
      </em>
    </div>
  );
};

export default NTextField;
