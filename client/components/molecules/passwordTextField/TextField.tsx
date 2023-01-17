import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import PasswordIcon from '../../atoms/passwordIcon/PasswordIcon';
import { passwordTextFieldPropsType } from './passwordTextFieldType';

const TextField = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
}: passwordTextFieldPropsType) => {
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
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        label={label}
        onChange={onChange}
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
