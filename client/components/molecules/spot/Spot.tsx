import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { spotPropsType } from './spotType';

const Spot = ({ spot }: spotPropsType) => {
  return (
    <div className="flex flex-col justify-center items-center w-fit">
      <LocationOnOutlinedIcon color="primary" />
      <span className="text-xs text-primary">{spot}</span>
    </div>
  );
};

export default Spot;
