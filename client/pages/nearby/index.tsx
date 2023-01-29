import React, { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import {
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from '../../api/post';
import { setMarkerCluster } from '../../api/kakaoMap';
import { useSearchPropsType } from '../../hooks/search/useSearch';
import BasicTabs from '../../components/molecules/tab/BasicTabs';
import TabPanel from '../../components/atoms/tabPanel/TabPanel';
import NearByList from '../../components/organisms/nearByList/NearByList';
import { ListItemPropsType } from '../../components/molecules/sharingListItem/sharingListItemType';
import ToggleButtons from '../../components/molecules/toggleButtonGroup/ToggleButtonGroup';

interface nearbyPropsType {
  dehydratedState: any;
  lat: number;
  lng: number;
  argumentOfLocation: useSearchPropsType['argumentOfLocation'];
  searchOption: string;
}
const LABEL = ['거리순', '최신순'];
const Index = ({
  dehydratedState,
  lat,
  lng,
  argumentOfLocation,
  searchOption,
}: nearbyPropsType) => {
  const [sharingLists, setSharingLists] = useState(
    dehydratedState?.queries[0]?.state.data.data
  );
  const [sharingListsSortedByTime, setSharingListsSortedByTime] = useState<
    ListItemPropsType[]
  >([]);
  const [mapCenter, setMapCenter] = useState({
    lat,
    lng,
    address: argumentOfLocation?.locationData?.address,
  });
  const [alignment, setAlignment] = useState<number>(1.5);

  useEffect(() => {
    setMarkerCluster(mapCenter, sharingLists, setMapCenter);
  }, [sharingLists, dehydratedState?.queries[0]?.state.data.data]);

  const { data, refetch } = useQuery({
    queryKey: ['sharingList'],
    queryFn: () => {
      return getPostsInSpecifiedLocation({
        locationData: mapCenter,
        range: alignment || 1.5,
        category: argumentOfLocation?.category || 'product',
        page: 1,
        size: 300,
      });
    },
    onSuccess: (data) => {
      setSharingLists(data.data);
    },
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (searchOption !== '글 제목') {
      refetch();
    }
  }, [mapCenter.address, alignment]);
  const [locationError, setLocationError] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    if (newCurrentTab === 1) {
      const sortedByTime: ListItemPropsType[] =
        sharingLists?.length > 0
          ? [...sharingLists]?.sort(
              (a, b) =>
                new Date(b.createDate).valueOf() -
                new Date(a.createDate).valueOf()
            )
          : [];
      setSharingListsSortedByTime(sortedByTime);
    }
    setCurrentTab(newCurrentTab);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number
  ) => {
    setAlignment(newAlignment);
  };
  const TOGGLE_VALUES = [
    { value: 0.5, label: '0.5Km' },
    { value: 1, label: '1Km' },
    { value: 1.5, label: '1.5Km' },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full h-fit">
        <div id="map" className="w-[100%] h-[350px]"></div>
        <p>
          <em className="text-gray-400">
            마우스를 드래그해서 지도를 이동해보세요 등록된 게시물이 나타납니다
          </em>
        </p>
        <p>
          <em className="text-gray-400">
            지도나 마커를 클릭해주세요! 주변에 게시물이 있다면 글 제목을 볼 수
            있습니다
          </em>
        </p>
        {locationError && <div>{locationError}</div>}
      </div>
      <BasicTabs
        currentTab={currentTab}
        handleChange={handleChange}
        tabLabels={LABEL}
        centered={false}
      />
      <div className="flex w-[100%] items-center">
        <p>
          <strong className="font-[500] whitespace-nowrap">
            주변 게시물 수 : {sharingLists?.length}
          </strong>
        </p>
        <div className="flex w-[100%] items-center justify-end mt-4 mr-4">
          <span className="mr-4">거리설정</span>
          <ToggleButtons
            alignment={alignment}
            handleAlignment={handleAlignment}
            toggleValues={TOGGLE_VALUES}
          />
        </div>
      </div>
      <TabPanel currentTab={currentTab} index={0}>
        <NearByList sharingLists={sharingLists} />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <NearByList sharingLists={sharingListsSortedByTime || []} />
      </TabPanel>
    </div>
  );
};
export default Index;

export async function getServerSideProps(context: any) {
  const {
    range: defaultRange,
    category: defaultCategory,
    page,
    size,
    lat,
    lng,
    address,
    searchOption,
    type,
    keyword,
  } = context?.query;
  console.log(context?.query);

  const requestData = {
    lat: Number(lat),
    lng: Number(lng),
    address: decodeURIComponent(address),
  };

  const argumentOfLocation = {
    locationData: requestData,
    range: defaultRange || '',
    category: defaultCategory || '',
    page: page || 1,
    size: size || 300,
  };
  const argumentOfTitle = {
    type: type || 4,
    keyword: decodeURIComponent(keyword),
    page: page || 1,
    size: size || 300,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['sharingList'], async () => {
    if (searchOption === '주소') {
      return await getPostsInSpecifiedLocation(argumentOfLocation);
    } else if (searchOption === '글 제목') {
      return await searchPostsByTitle(argumentOfTitle);
    }
  });
  const sharingLists = dehydrate(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient) || '',
      lat: lat || 37.4954330863648,
      lng: lng || 126.88750531451,
      argumentOfLocation: argumentOfLocation || '',
      argumentOfTitle: argumentOfTitle || '',
      searchOption: searchOption || '',
    },
  };
}
