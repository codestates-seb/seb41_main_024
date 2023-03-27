import axios from 'axios';
import { setDefaultCoordsAndAddress } from './kakaoMap';
const kakao = typeof window !== 'undefined' ? (window as any).kakao : null;

const REQUEST_URL = 'https://ngether.site';
export const getCurrentLocation = (setLocation: any, setLocationError: any) => {
  const geoLocationOptions = { enableHighAccuracy: true };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const center = { lat, lng };
        if (lat === 0 || lng === 0) return;
        setDefaultCoordsAndAddress(center, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            let detailAddr = !!result[0].address.address_name
              ? result[0].address.address_name
              : result[0].road_address.address_name;
            setLocation({ ...center, address: detailAddr });
          }
        });
      },
      setLocationError,
      geoLocationOptions
    );
  }
};

interface setAddressBooksType {
  locationData?: {
    address: string;
    lat: string;
    lng: string;
    locationName: string;
  };

  Authorization: string;
  Refresh: string;
  locationId?: number;
}

export const setAddressBooks = async ({
  locationData,
  Authorization,
  Refresh,
}: setAddressBooksType) => {
  const dataToRequest = {
    ...locationData,
    latitude: locationData?.lat,
    longitude: locationData?.lng,
  };
  return axios({
    method: 'post',
    url: `${REQUEST_URL}/api/location`,
    data: dataToRequest,
    headers: { Authorization, Refresh },
  }).then((res) => res.data);
};
export const getAddressBooks = async ({
  Authorization,
  Refresh,
}: setAddressBooksType) => {
  return axios({
    method: 'get',
    url: `${REQUEST_URL}/api/myLocations?page=1&size=10`,
    headers: { Authorization, Refresh },
  }).then((res) => res.data);
};

export const deleteAddressBook = async ({
  Authorization,
  Refresh,
  locationId,
}: setAddressBooksType) => {
  return axios({
    method: 'delete',
    url: `${REQUEST_URL}/api/location/${locationId}`,
    headers: { Authorization, Refresh },
  });
};
