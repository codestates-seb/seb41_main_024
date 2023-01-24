import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { exchangeCoordToAddress, searchMap } from '../../../api/kakaoMap';
import { getCurrentLocation } from '../../../api/location';
import Input from '../../atoms/input/Input';
import FormButton from '../../molecules/formbutton/FormButton';
const KakaoMap = ({
  setTargetCoord,
}: {
  setTargetCoord: (item: {}) => void;
}) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const handleSearchAddress = (e) => {
    setSearchAddress(e.target.value);
  };
  useEffect(() => {
    getCurrentLocation(setCenter, setError);
  }, []);
  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center]);

  return (
    <>
      <div id="map" className="w-[100%] h-[350px]"></div>
      <p>
        <em>지도를 클릭해주세요!</em>
      </p>
      <div className="flex width-[100%]">
        <Input
          id="location"
          name="location"
          type="text"
          label="도로명주소 검색"
          onChange={handleSearchAddress}
        />
        <FormButton
          variant="contained"
          className="bg-[#63A8DA] text-[white] ml-[10px]"
          content="검색"
          onClick={() => searchMap(searchAddress, setCenter)}
        ></FormButton>
      </div>
    </>
  );
};
export default KakaoMap;
