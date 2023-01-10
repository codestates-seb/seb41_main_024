import { ReactComponent as Heart } from '../../../public/sharingList/heart.svg';

const Button = ({ heartButton }: ButtonPropsType) => {
  console.log(Heart);

  return <button>{heartButton ? <Heart /> : null}</button>;
};

export default Button;
