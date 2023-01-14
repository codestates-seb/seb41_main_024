import React from 'react';
import { IconButton } from '@mui/material';
import { passwrodIconPropsType } from './passwordIcon';

const PasswordIcon = ({
  handleClickShowPassword,
  handleMouseDownPassword,
}: passwrodIconPropsType) => {
  return (
    <IconButton
      aria-label="toggle password visibility"
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
      edge="end"
    />
  );
};

export default PasswordIcon;
