export const getCurrentLocation = (setLocation: any, setLocationError: any) => {
  const geoLocationOptions = { enableHighAccuracy: true };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        setLocation({ lat, lng });
      },
      setLocationError,
      geoLocationOptions
    );
  }
};
