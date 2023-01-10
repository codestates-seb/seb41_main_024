import { ReactComponent as Heart } from '../../../public/sharingList/heart.svg';

const Button = ({ heartButton }) => {
  console.log(Heart);

  return (
    <button>
      <Heart />
    </button>
  );
};

export default Button;
