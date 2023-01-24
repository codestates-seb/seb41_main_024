import { Dispatch, SetStateAction } from 'react';

interface getCurrentLocationPropsType {
  setLocation: (item: {}) => void;
  setLocationError: () => void;
  center: { lat: number; lng: number };
}
export const getCurrentLocation = (
  setLocation: getCurrentLocationPropsType['setLocation'],
  setLocationError: getCurrentLocationPropsType['setLocationError']
) => {
  const geoLocationOptions = { enableHighAccuracy: true };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const center = { lat, lng };
        setLocation(center);
      },
      setLocationError,
      geoLocationOptions
    );
  }
};
