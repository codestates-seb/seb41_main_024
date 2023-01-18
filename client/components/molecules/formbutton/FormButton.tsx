import { Button } from '@mui/material';
import { formButtonType } from './formButtonType';

const FormButton = ({ variant, content, className, type }: any) => {
  return (
    <Button
      className={
        variant === 'contained'
          ? 'text-white ' + className
          : 'text-[#63A8DA] ' + className
      }
      variant={variant}
      type={type}
    >
      {content}
    </Button>
  );
};

export default FormButton;
