import Image from 'next/image';
import { buttonPropsType } from './button';
const Button = ({ src, width, height, alt }: buttonPropsType) => {
  return (
    <button>
      <Image src={src} width={width} height={height} alt={alt} />
    </button>
  );
};

export default Button;
