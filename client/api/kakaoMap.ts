import { kakaoMapItemType } from './../components/molecules/sharingListItem/sharingListItemType';
import { ListItemPropsType } from '../components/molecules/sharingListItem/sharingListItemType';
import { Dispatch, SetStateAction } from 'react';

interface getMapAndMarkerPropsType {
  center: {
    lat: number;
    lng: number;
    mapLevel?: number;
    address?: string;
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
  setTargetCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
      address: string;
    }>
  >
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

  function searchDetailAddrFromCoords(
    coords: kakao.maps.LatLng,
    displayMarkerOnClick: (result: any, status: any) => void
  ) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      displayMarkerOnClick
    );
  }

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
};

export const setDefaultCoordsAndAddress = (
  center: getMapAndMarkerPropsType['center'],
  setCoordsAndAddress: (result: any, status: kakao.maps.services.Status) => void
) => {
  let geocoder = new kakao.maps.services.Geocoder();
  geocoder.coord2Address(center.lng, center.lat, setCoordsAndAddress);
};

export const searchMap = (searchAddress: string, setCenter: any) => {
  const geocoder = new kakao.maps.services.Geocoder();
  let switchLocationToCoordinate = function (
    result: any,
    status: kakao.maps.services.Status
  ) {
    if (status === kakao.maps.services.Status.OK) {
      const newSearch = result[0];
      setCenter({
        lat: newSearch.y,
        lng: newSearch.x,
        address: searchAddress,
      });
    }
  };
  geocoder.addressSearch(`${searchAddress}`, switchLocationToCoordinate);
};

export const setMarkerCluster = async (
  coords: getMapAndMarkerPropsType['center'],
  sharingLists: kakaoMapItemType[],
  setMapCenter: getMapAndMarkerPropsType['setTargetCoord']
) => {
  let mapContainer =
    document.getElementById('map') || document.createElement('div');
  const map = new kakao.maps.Map(mapContainer, {
    // 지도를 표시할 div
    center: new kakao.maps.LatLng(coords.lat, coords.lng), // 지도의 중심좌표
    level: coords.mapLevel || 4, // 지도의 확대 레벨
  });
  let marker = new kakao.maps.Marker({ position: map.getCenter() }); // 클릭한 위치를 표시할 마커입니다
  marker.setMap(map);
  // 마커 클러스터러를 생성합니다
  const clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 4, // 클러스터 할 최소 지도 레벨
  });
  let markers = [];
  let mapLevel: number;
  kakao.maps.event.addListener(map, 'zoom_changed', function () {
    mapLevel = map.getLevel();
    setMapCenter((prev: getMapAndMarkerPropsType) => {
      return { ...prev, mapLevel };
    });
  });
  kakao.maps.event.addListener(map, 'dragend', function () {
    let latlng: any = map.getCenter();

    // latlng가 any가 아닐 때 Ma와 La 필드가 latlng에 존재하지 않는다고 오류뜸.
    const mapCenter = { lat: latlng.Ma, lng: latlng.La };
    setDefaultCoordsAndAddress(mapCenter, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let detailAddr = !!result[0].address.address_name
          ? result[0].address.address_name
          : result[0].road_address.address_name;
        setMapCenter((prev: getMapAndMarkerPropsType) => {
          return { ...prev, ...mapCenter, address: detailAddr };
        });
      }
    });
  });

  for (let i = 0; i < sharingLists?.length; i++) {
    let sharingItemMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        sharingLists[i]?.latitude,
        sharingLists[i]?.longitude
      ),
      clickable: true,
    });
    markers.push(sharingItemMarker);

    /* const infoWindowContent = `<div class="bg-white rounded-2xl">
    <div>${sharingLists[i]?.title}</div>
    </div>`;
    let infoWindow = new kakao.maps.InfoWindow({
      content: infoWindowContent,
      position: sharingItemMarker.getPosition(),
      removable: true,
    });
    kakao.maps.event.addListener(sharingItemMarker, 'click', function () {
      infoWindow.open(map, sharingItemMarker);
    }); */
    const customOverlayContent = `<div class="absolute bg-white" style="bottom: 40px; transform: translateX(-50%); border-radius: 15px; border: 1px solid #63A8DA; padding: 0 10px;">
    <a href=/nearby/${sharingLists[i]?.boardId} target=_blank>${sharingLists[i]?.title}</a>
    </div>`;
    let customOverlay = new kakao.maps.CustomOverlay({
      content: customOverlayContent,
      position: sharingItemMarker.getPosition(),
      zIndex: 3,
    });
    let isAllOverlayOpen = false;
    let isOverlayOpen = false;
    kakao.maps.event.addListener(map, 'click', function () {
      if (!isAllOverlayOpen) {
        customOverlay.setMap(map);
        isAllOverlayOpen = true;
        isOverlayOpen = true;
      } else {
        customOverlay.setMap(null);
        isAllOverlayOpen = false;
        isOverlayOpen = false;
      }
    });

    kakao.maps.event.addListener(sharingItemMarker, 'click', function () {
      if (!isOverlayOpen) {
        customOverlay.setMap(map);
        isOverlayOpen = true;
      } else if (isOverlayOpen) {
        customOverlay.setMap(null);
        isOverlayOpen = false;
      }
    });
  }
  clusterer.addMarkers(markers);
};
