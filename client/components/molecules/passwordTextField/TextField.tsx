import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import PasswordIcon from '../../atoms/passwordIcon/PasswordIcon';

const TextField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ m: 1, width: '328px' }} variant="outlined">
      <Input
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        label="비밀번호"
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
      <FormHelperText id="outlined-password-helper-text">
        비밀번호를 입력하세요
      </FormHelperText>
    </FormControl>
  );
};

export default TextField;
