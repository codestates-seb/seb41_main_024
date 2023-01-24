import React, { useEffect, useState } from 'react';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import {
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from '../../api/post';

import { setMarkerCluster } from '../../api/kakaoMap';
import { useSearchPropsType } from '../../hooks/search/useSearch';

interface nearbyPropsType {
  dehydratedState: any;
  lat: number;
  lng: number;
  argumentOfLocation: useSearchPropsType['argumentOfLocation'];
}

const Index = ({
  dehydratedState,
  lat,
  lng,
  argumentOfLocation,
}: nearbyPropsType) => {
  const [sharingLists, setSharingLists] = useState(
    dehydratedState?.queries[0]?.state.data.data
  );
  const [mapCenter, setMapCenter] = useState({
    lat,
    lng,
    address: argumentOfLocation?.address,
  });
  console.log('default', sharingLists);

  useEffect(() => {
    setMarkerCluster(mapCenter, sharingLists, setMapCenter);
  }, [sharingLists, dehydratedState?.queries[0]?.state.data.data]);

  const { data, refetch } = useQuery({
    queryKey: ['sharingList'],
    queryFn: () => {
      return getPostsInSpecifiedLocation({
        locationData: mapCenter,
        range: 1.5,
        category: argumentOfLocation?.category,
        page: 1,
        size: 300,
      });
    },
    onSuccess: (data) => {
      console.log('query', data);

      setSharingLists(data.data);
    },
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (!!argumentOfLocation?.category) {
      refetch();
    }
  }, [mapCenter.address]);
  const [locationError, setLocationError] = useState('');
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full h-fit">
        <div id="map" className="w-[100%] h-[350px]"></div>
        <p>
          <em>지도를 클릭해주세요!</em>
        </p>
        {locationError && <div>{locationError}</div>}
      </div>
      <NearByPageTab sharingLists={sharingLists} />
    </div>
  );
};
export default Index;

export async function getServerSideProps(context) {
  const {
    range: defaultRange,
    category: defaultCategory,
    page,
    size,
    lat,
    lng,
    address,
    searchOption,
    type,
    keyword,
  } = context?.query;
  const requestData = {
    lat: Number(lat),
    lng: Number(lng),
    address: decodeURIComponent(address),
  };

  const argumentOfLocation = {
    locationData: requestData,
    range: defaultRange || '',
    category: defaultCategory || '',
    page: page || 1,
    size: size || 300,
  };
  const argumentOfTitle = {
    type: type || 4,
    keyword: decodeURIComponent(keyword),
    page: page || 1,
    size: size || 300,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['sharingList'], async () => {
    if (searchOption === '주소') {
      return await getPostsInSpecifiedLocation(argumentOfLocation);
    } else if (searchOption === '글 제목') {
      return await searchPostsByTitle(argumentOfTitle);
    }
  });
  const sharingLists = dehydrate(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient) || '',
      lat: lat || 37.4954330863648,
      lng: lng || 126.88750531451,
      argumentOfLocation: argumentOfLocation || '',
      argumentOfTitle: argumentOfTitle || '',
    },
  };
}
