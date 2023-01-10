import { Button } from '@mui/material';
import { FormButtonProps } from './Type_formbutton';

const FormButton = (props: FormButtonProps) => {
  return (
    <Button 
      className={
        props.variant === "contained" 
        ? "text-white " + props.className 
        : "text-[#63A8DA] " + props.className
      } 
      variant={props.variant}
    >
      {props.content}
    </Button>
  )
}

export default FormButton;