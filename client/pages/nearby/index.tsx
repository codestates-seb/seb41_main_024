import { BottomNavigation } from '@mui/material';
import React from 'react';
import Img from '../../components/atoms/image/Image';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';

const Index = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full h-fit">
        <Img src="/sharingList/map.svg" alt="지도" />
      </div>
      <NearByPageTab />
    </div>
  );
};
export default Index;
