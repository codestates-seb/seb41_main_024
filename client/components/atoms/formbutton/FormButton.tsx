import { Button } from '@mui/material';
import { formButtonType } from './formButtonType';

const FormButton = ({
  variant,
  content,
  className,
}: formButtonType) => {
  return (
    <Button
      className={
        variant === 'contained'
          ? 'text-white ' +  className
          : 'text-[#63A8DA] ' + className
      }
      variant={variant}
    >
      {content}
    </Button>
  );
};

export default FormButton;
