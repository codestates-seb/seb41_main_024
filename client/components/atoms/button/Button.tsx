import { ReactComponent as Heart } from '../../../public/sharingList/heart.svg';
import { ButtonPropsType } from './Type_Button';
const Button = ({ heartButton }: ButtonPropsType) => {
  return <button>{heartButton ? <Heart /> : null}</button>;
};

export default Button;
