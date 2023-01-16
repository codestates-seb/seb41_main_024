import { buttonType } from './buttonType';

const Button = ({ children, ...props }: buttonType) => {
  return <button {...props}>{children}</button>;
};

export default Button;
