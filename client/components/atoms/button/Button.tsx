import { buttonPropsType } from './button';
const Button = ({ children, ...props }: buttonPropsType) => {
  return <button {...props}>{children}</button>;
};

export default Button;
