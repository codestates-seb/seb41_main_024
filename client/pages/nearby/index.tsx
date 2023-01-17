import { BottomNavigation } from '@mui/material';
import React from 'react';
import Img from '../../components/atoms/image/Image';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/post';

const Index = () => {
  const locationId = 1;
  const range = 1;
  const category = '상품 쉐어링';
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['sharingList'],
    queryFn: () => getPosts({ locationId, range, category }),
  });
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
