import { Button } from '@mui/material';
import { formButtonPropsType } from './formButton';

const FormButton = ({
  variant,
  content,
  className,
}: formButtonPropsType) => {
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
