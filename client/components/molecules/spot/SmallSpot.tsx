import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { addressPropsType } from './spot';

const SmallSpot = ({ address }: addressPropsType) => {
  return (
    <div className="flex justify-center items-center w-fit mb-1">
      <LocationOnOutlinedIcon color="primary" sx={{ width: '16px' }} />
      <span className="text-xs text-primary">{address}</span>
    </div>
  );
};

export default SmallSpot;
