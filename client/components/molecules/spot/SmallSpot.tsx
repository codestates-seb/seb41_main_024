import Image from 'next/image';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

type spotPropsType = {
  spot: string;
};

const SmallSpot = ({ spot }: spotPropsType) => {
  return (
    <div className="flex justify-center items-center w-fit mb-1">
      <LocationOnOutlinedIcon color="primary" sx={{ width: '16px' }} />
      <span className="text-xs text-primary">{spot}</span>
    </div>
  );
};

export default SmallSpot;
