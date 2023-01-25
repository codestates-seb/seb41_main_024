import { Button } from '@mui/material';
import { formButtonType } from './formButtonType';

const FormButton = ({
  variant,
  content,
  className,
  type,
  ...props
}: formButtonType) => {
  return (
    <Button
      className={
        variant === 'contained'
          ? 'text-white ' + className
          : 'text-[#63A8DA] ' + className
      }
      variant={variant}
      type={type}
      {...props}
    >
      {content}
    </Button>
  );
};

export default FormButton;
