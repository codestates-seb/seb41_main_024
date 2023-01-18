import { buttonType } from './buttonType';

const Button = ({ children, ...props }: any) => {
  return <button {...props}>{children}</button>;
};

export default Button;
