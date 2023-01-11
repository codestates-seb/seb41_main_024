import Image from 'next/image';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

type spotPropsType = {
  spot: string;
};

const SmallSpot = ({ spot }: spotPropsType) => {
  return (
    <div className="flex justify-center items-center w-fit">
      <LocationOnOutlinedIcon color="primary" />
      <span className="text-xs text-primary">{spot}</span>
    </div>
  );
};

export default SmallSpot;
