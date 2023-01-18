import { FormControl, FormHelperText } from '@mui/material';
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
    <FormControl sx={{ m: 1, width }} variant="outlined">
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
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Input>
      <FormHelperText id="outlined-category-helper-text">
        카테고리를 선택해주세요
      </FormHelperText>
    </FormControl>
  );
};

export default DropdownInput;
