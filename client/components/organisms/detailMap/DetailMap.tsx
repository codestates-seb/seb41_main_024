import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export interface MapProps {
  latitude: number;
  longitude: number;
}

export default function DetailMap({
  latitude = 37.4961,
  longitude = 126.9891,
}: MapProps) {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    });
  }, []);

  return <div id="map" className="w-full h-80 bg-primary"></div>;
}
