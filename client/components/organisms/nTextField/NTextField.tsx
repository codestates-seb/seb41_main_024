import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { nTextFieldType } from './nTextFieldType';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useShowPassword from '../../../hooks/common/useShowPassword';
import classnames from 'classnames';

const NInput = ({
  id,
  type = 'text',
  label,
  value,
  validation,
  maxLength,
  disabled,
  required,
  helperText,
  onChange,
}: nTextFieldType) => {
  const [showPassword, handleClickShowPassword, handleMouseDownPassword] =
    useShowPassword(false);

  return (
    <div className="min-h-[76px]">
      <FormControl className="w-full" variant="outlined">
        <InputLabel className="bg-white px-[0.125rem]" htmlFor={id}>
          {label}
        </InputLabel>
        <OutlinedInput
          id={id}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          endAdornment={
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="비밀번호 보기"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
          label={label}
          value={value}
          autoComplete="off"
          disabled={disabled}
          required={required}
          onChange={onChange}
          inputProps={{
            maxLength: maxLength,
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.preventDefault();
          }}
        />

        <FormHelperText
          className={classnames({ 'text-[red]': !validation })}
          id={`${id}HelperText`}
        >
          {helperText}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default NInput;
