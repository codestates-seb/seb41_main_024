import { IconButton } from '@mui/material';
import { passwrodIconPropsType } from './Type_passwordIcon';

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
