import React from 'react';
import { IconButton } from '@mui/material';
import { passwrodIconType } from './passwordIconType';

const PasswordIcon = ({
  handleClickShowPassword,
  handleMouseDownPassword,
}: passwrodIconType) => {
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
