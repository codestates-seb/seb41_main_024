interface getMapAndMarkerPropsType {
  center: {
    lat: number;
    lng: number;
  };
  setTargetCoord: (item: {}) => void;
}

export const getMapAndMarker = async (
  center: getMapAndMarkerPropsType['center'],
  setTargetCoord: getMapAndMarkerPropsType['setTargetCoord']
) => {
  let mapContainer =
      document.getElementById('map') || document.createElement('div'), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(center.lat, center.lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 지도를 클릭한 위치에 표출할 마커입니다
  let marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter(),
  });
  // 지도에 마커를 표시합니다
  marker.setMap(map);

  // 지도에 클릭 이벤트를 등록합니다
  // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다

  kakao.maps.event.addListener(
    map,
    'click',
    function mapClickHandler(mouseEvent: kakao.maps.event.MouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      // 클릭한 위도, 경도 정보 저장
      setTargetCoord({ lat: latlng.getLat(), lng: latlng.getLng() });

      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';

      let resultDiv = document.getElementById('clickLatlng');
      resultDiv.innerText = message;
    }
  );
};

export const exchangeCoordToAddress = async (
  center: getMapAndMarkerPropsType['center'],
  setTargetCoord: getMapAndMarkerPropsType['setTargetCoord']
) => {
  let mapContainer =
      document.getElementById('map') || document.createElement('div'), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(center.lat, center.lng), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  let map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  let geocoder = new kakao.maps.services.Geocoder();

  let marker = new kakao.maps.Marker({ position: map.getCenter() }); // 클릭한 위치를 표시할 마커입니다
  marker.setMap(map);
  // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다

  // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(
    map,
    'click',
    function (mouseEvent: kakao.maps.event.MouseEvent) {
      searchDetailAddrFromCoords(
        mouseEvent.latLng,
        function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            let detailAddr = !!result[0].address.address_name
              ? result[0].address.address_name
              : result[0].road_address.address_name;
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
            let latlng = mouseEvent.latLng;
            setTargetCoord({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
              address: detailAddr,
            });
          }
        }
      );
    }
  );

  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다

  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
};

export const searchMap = (searchAddress: string, setCenter: any) => {
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
