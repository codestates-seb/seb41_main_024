import { BottomNavigation } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Img from '../../components/atoms/image/Image';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import {
  getPosts,
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from '../../api/post';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import useDropDown from '../../hooks/common/useDropDown';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getCurrentLocation } from '../../api/location';
import { useRouter } from 'next/router';
import useSearch from '../../hooks/search/useSearch';
import { setMarkerCluster } from '../../api/kakaoMap';
const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];
const DISTANCE_OPTIONS_PRODUCTS = [
  { label: '0.5km', value: '0.5km' },
  { label: '1km', value: '1km' },
  { label: '1.5km', value: '1.5km' },
];
const DISTANCE_OPTIONS_DELIVERY = [
  { label: '200m', value: '200m' },
  { label: '400m', value: '400m' },
  { label: '600m', value: '600m' },
];

const Index = ({ dehydratedState, lat, lng }) => {
  const sharingLists = dehydratedState?.queries[0]?.state.data.data;

  const { inputValue, onChange } = useDropDown({
    category: '',
    range: '',
  });
  useEffect(() => {
    const coords = { lat, lng };
    setMarkerCluster(coords, sharingLists);
  }, []);

  const { category, range } = inputValue;
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
      {/* <form>
        <DropdownInput
          dropDownOptions={CATEGORY_OPTIONS}
          id="category"
          label="카테고리"
          width="164px"
          name="category"
          onchange={onChange}
          value={category}
        />
        {category === 'product' ? (
          <DropdownInput
            dropDownOptions={DISTANCE_OPTIONS_PRODUCTS}
            id="distance"
            label="거리설정"
            width="120px"
            name="range"
            onchange={onChange}
            value={range}
          />
        ) : (
          <DropdownInput
            dropDownOptions={DISTANCE_OPTIONS_DELIVERY}
            id="distance"
            label="거리설정"
            width="120px"
            name="range"
            onchange={onChange}
            value={range}
          />
        )}
      </form> */}
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
    data: requestData,
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
