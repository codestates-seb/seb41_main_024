import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { getMapAndMarker } from '../../../api/kakaoMap';
import { getCurrentLocation } from '../../../api/location';
import Input from '../../atoms/input/Input';
import FormButton from '../../molecules/formbutton/FormButton';
const KakaoMap = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');
  const [searchAddress, setSearchAddress] = useState();
  const SearchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let switchLocationToCoordinate = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setCenter({
          lat: newSearch.y,
          lng: newSearch.x,
        });
      }
    };
    geocoder.addressSearch(`${searchAddress}`, switchLocationToCoordinate);
  };
  const handleSearchAddress = (e) => {
    setSearchAddress(e.target.value);
  };
  useEffect(() => {
    getCurrentLocation(setCenter, setError);
    SearchMap();
  }, []);
  useEffect(() => {
    getMapAndMarker(center);
  }, [center]);
  /*   
  
  useEffect(() => {
    getCurrentLocation(setCenter, setError);
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP}&autoload=false&libraries=services,clusterer,drawing`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById(
          '#react-kakao-maps-sdk-map-container'
        );
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          center.lat,
          center.lng
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap); 
  }, [center.lat, center.lng]);*/
  return (
    <>
      <div id="map" className="w-[100%] h-[350px]"></div>
      <p>
        <em>지도를 클릭해주세요!</em>
      </p>
      <div className="flex width-[100%]">
        <Input onChange={handleSearchAddress} />
        <FormButton
          variant="outlined"
          className="bg-[#63A8DA] text-[white] ml-[10px]"
        >
          검색
        </FormButton>
      </div>
      <div id="clickLatlng"></div>
    </>
  );
};
export default KakaoMap;
