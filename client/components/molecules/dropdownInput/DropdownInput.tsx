import { FormControl, FormHelperText, MenuItem } from '@mui/material';
import React from 'react';
import Input from '../../atoms/input/Input';
import { dropDownInputType } from './dropDownInputType';

const DropdownInput = ({
  id,
  label,
  dropDownOptions,
  width,
  value,
  onChange,
  defaultValue,
  ...props
}: dropDownInputType) => {
  return (
    <FormControl
      sx={{ marginTop: 1, marginBottom: 1, width }}
      variant="outlined"
    >
      <Input
        id={id}
        label={label}
        select={true}
        defaultValue={dropDownOptions[0]?.label || '기본값'}
        selectProps={{
          native: true,
        }}
        onChange={onChange}
        {...props}
      >
        {dropDownOptions?.map((option: any) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Input>
    </FormControl>
  );
};

export default DropdownInput;
