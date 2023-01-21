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
  onchange,
  defaultValue,
  ...props
}: any) => {
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
        onChange={onchange}
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
