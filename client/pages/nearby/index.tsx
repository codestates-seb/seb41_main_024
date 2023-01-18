import { BottomNavigation } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Img from '../../components/atoms/image/Image';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/post';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import useDropDown from '../../hooks/common/useDropDown';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getCurrentLocation } from '../../api/location';
const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: 'product' },
  { label: '배달음식 쉐어링', value: 'delivery' },
];
const DISTANCE_OPTIONS_PRODUCTS = [
  { label: '0.5km', value: 0.5 },
  { label: '1km', value: 1 },
  { label: '1.5km', value: 1.5 },
];
const DISTANCE_OPTIONS_DELIVERY = [
  { label: '200m', value: 0.2 },
  { label: '400m', value: 0.4 },
  { label: '600m', value: 0.6 },
];

const Index = () => {
  const locationId = 1;
  const [location, setLocation] = useState({
    lat: 35.6194352,
    lng: 129.3486386,
  });
  const { inputValue, onChange } = useDropDown({
    category: '',
    range: '',
  });
  const [locationError, setLocationError] = useState('');
  useEffect(() => getCurrentLocation(setLocation, setLocationError), []);
  console.log(location);

  const { category, range } = inputValue;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['sharingList'],
    queryFn: () => getPosts({ locationId, range, category }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: false,
  });
  console.log(category);

  console.log(data);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full h-fit">
        <Map
          center={{ lat: location?.lat, lng: location?.lng }}
          style={{ width: '100%', height: '360px' }}
        >
          <MapMarker position={{ lat: location?.lat, lng: location?.lng }}>
            <div style={{ color: '#000' }}>Hello World!</div>
          </MapMarker>
        </Map>
        {locationError && <div>{locationError}</div>}
      </div>
      <form>
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
      </form>
      <NearByPageTab />
    </div>
  );
};
export default Index;
