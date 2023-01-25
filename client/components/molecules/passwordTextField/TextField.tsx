import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import PasswordIcon from '../../atoms/passwordIcon/PasswordIcon';
import { passwordTextFieldPropsType } from './passwordTextFieldType';

const TextField = (props: passwordTextFieldPropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl variant="outlined">
      <Input
        id={props.id}
        type={showPassword ? 'text' : 'password'}
        label={props.label}
        endAdornment={
          <InputAdornment position="end">
            <PasswordIcon
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default TextField;
