import Image from 'next/image';
import MapIcon from '../../../src/assets/navbar/map.svg';

type spotPropsType = {
  spot: string;
};

const Spot = ({ spot }: spotPropsType) => {
  return (
    <div className="flex justify-center items-center w-fit text-gray-600">
      <Image src={MapIcon} width={22} height={22} alt="spot" />
      <span className="text-gray-600 ml-1">{spot}</span>
    </div>
  );
};

export default Spot;
