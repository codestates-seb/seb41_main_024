import { ButtonPropsType } from './Type_Button';
const Button = ({ children, ...props }: ButtonPropsType) => {
  return <button {...props}>{children}</button>;
};

export default Button;
