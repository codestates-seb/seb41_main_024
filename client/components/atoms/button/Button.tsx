import Image from 'next/image';
import { ButtonPropsType } from './Type_Button';
const Button = ({ src, width, height, alt }: ButtonPropsType) => {
  return (
    <button>
      <Image src={src} width={width} height={height} alt={alt} />
    </button>
  );
};

export default Button;
