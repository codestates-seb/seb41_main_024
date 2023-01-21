export const getCurrentLocation = (setLocation: any, setLocationError: any) => {
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
