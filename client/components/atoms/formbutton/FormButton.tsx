import { Button } from '@mui/material';
import { FormButtonProps } from './Type_formbutton';

const FormButton = ({
  variant,
  content,
  className,
  onClick,
}: FormButtonProps) => {
  return (
    <Button
      className={
        variant === 'contained'
          ? 'text-white ' + className
          : 'text-[#63A8DA] ' + className
      }
      variant={variant}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default FormButton;
