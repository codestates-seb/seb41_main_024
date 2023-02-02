import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import {
  getAllSharingPosts,
  getPostsByAddressBook,
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from '../../api/post';
import { setMarkerCluster } from '../../api/kakaoMap';
import { useSearchPropsType } from '../../hooks/search/useSearch';
import BasicTabs from '../../components/molecules/tab/BasicTabs';
import TabPanel from '../../components/atoms/tabPanel/TabPanel';
import NearByList from '../../components/organisms/nearByList/NearByList';
import ToggleButtons from '../../components/molecules/toggleButtonGroup/ToggleButtonGroup';
import { getCurrentLocation } from '../../api/location';
import Pagination from '@mui/material/Pagination';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import CircleLoading from '../../components/organisms/circleLoading/CircleLoading';
import FormButton from '../../components/molecules/formbutton/FormButton';
import AddressBook, {
  locationDataType,
} from '../../components/container/addressBook/AddressBook';
const TOGGLE_VALUES = [
  { value: 0.5, label: '0.5Km' },
  { value: 1, label: '1Km' },
  { value: 1.5, label: '1.5Km' },
];
const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];

interface nearbyPropsType {
  dehydratedState: any;
  lat: number;
  lng: number;
  argumentOfLocation: useSearchPropsType['argumentOfLocation'];
  searchOption: string;
  address: string;
  keyword: string;
  type: number;
  selectedAddressBookId: number;
}
const LABEL = ['거리순', '최신순'];
const Index = ({
  dehydratedState,
  lat,
  lng,
  address,
  searchOption = '주소',
  keyword,
  type,
  selectedAddressBookId,
}: nearbyPropsType) => {
  const [mapCenter, setMapCenter] = useState({
    lat: lat || 37.517331925853,
    lng: lng || 127.047377408384,
    address: address === 'undefined' ? '서울 강남구' : address,
  });
  const [currentMapCenter, setCurrentMapCenter] = useState({
    lat: 0,
    lng: 0,
    address: '',
  });
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [category, setCategory] = useState('상품 쉐어링');

  const [locationError, setLocationError] = useState('');
  const [alignment, setAlignment] = useState<number>(1.5);
  const [page, setPage] = useState(1);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  useEffect(() => {
    const sharingListsInMap = dehydratedState?.queries[0]?.state.data.data;
    setMarkerCluster(
      mapCenter,
      sharingListsInMap,
      setCurrentMapCenter,
      setIsMapLoading
    );
  }, [mapCenter.address]);
  useEffect(() => {
    //검색 옵션이 글 제목이거나 검색페이지를 거치지 않고 왔을 때
    !lat && getCurrentLocation(setMapCenter, setLocationError);
  }, []);

  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    setCurrentTab(newCurrentTab);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number
  ) => {
    setAlignment(newAlignment);
  };
  const handlePagination = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const {
    status,
    data,
    error,
    isFetching,
    isPreviousData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['sharingLists', page],
    queryFn: () => {
      /* if (selectedAddressBookId * 1 >= 0) {
        console.log('getPostsByAddressBook');
        return getPostsByAddressBook({
          selectedAddressBookId,
          range: alignment,
          category: category === '상품 쉐어링' ? 'product' : 'delivery',
          sortBy: currentTab === 0 ? 'distance' : 'time',
          page,
        });
      } else */ if (searchOption === '주소') {
        return getPostsInSpecifiedLocation({
          locationData: currentMapCenter?.address
            ? currentMapCenter
            : mapCenter,
          range: alignment,
          category: category === '상품 쉐어링' ? 'product' : 'delivery',
          page: page || 1,
          size: 10,
          sortBy: currentTab === 0 ? 'distance' : 'time',
        });
      } else {
        return searchPostsByTitle({
          type,
          keyword,
          page: page || 1,
          size: 10,
        });
      }
    },
    keepPreviousData: true,
    staleTime: 5000,
    retry: false,
    refetchOnWindowFocus: false,
    onError: (data) => alert('검색에 실패했습니다 잠시후 다시 시도해주세요'),
  });

  useEffect(() => {
    refetch();
  }, [
    currentMapCenter.lat,
    currentMapCenter.lng,
    category,
    alignment,
    currentTab,
  ]);
  useEffect(() => {
    refetch();
  }, []);
  const handleOpenOptions = () => setIsOpenOptions((prev) => !prev);
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full h-fit">
        <div id="map" className="w-[100%] h-[350px] fadeIn">
          {isMapLoading && <CircleLoading />}
          <FormButton
            id="openAllOverlay"
            className="z-[4]"
            content="게시물 제목보기"
            variant={'contained'}
          />
        </div>
        <p>
          <em className="text-gray-400">
            마우스를 드래그해서 지도를 이동해보세요 주변 게시물이 나타납니다
          </em>
        </p>
        <p>
          <em className="text-gray-400">
            캐릭터를 클릭해주세요! 모집 글을 볼 수 있습니다
          </em>
        </p>
        <p className="text-[red]">
          {locationError &&
            '위치 정보 접근권한이 없어 현재 위치를 파악하지 못했습니다'}
        </p>
      </div>
      <BasicTabs
        currentTab={currentTab}
        handleChange={handleChange}
        tabLabels={LABEL}
        centered={false}
      />
      <div className="flex w-[100%] items-center">
        <div className="flex mt-2 justify-around px-2 w-[100%]">
          <p>
            <strong className="font-[500] whitespace-nowrap">
              주변 {category || ''} 게시물 수 :{' '}
              {data?.pageInfo.totalElements || 0}
            </strong>
          </p>
          {/* <button
            onClick={handleOpenOptions}
            className="bg-[gray] text-white p-1"
          >
            검색 상세 옵션
          </button> */}
        </div>
      </div>
      <div className="flex w-[100%] items-center justify-around p-2 ">
        <div className="flex items-center">
          <span className="mr-4">카테고리</span>
          <DropdownInput
            dropDownOptions={CATEGORY_OPTIONS}
            id="category"
            name="category"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
            defaultValue="상품 쉐어링"
            value={category}
          />
        </div>

        <div>
          <span className="mr-4">거리설정</span>
          <ToggleButtons
            alignment={alignment}
            handleAlignment={handleAlignment}
            toggleValues={TOGGLE_VALUES}
          />
        </div>
      </div>
      {/* {isOpenOptions && (
        <div className="flex flex-col w-[50%] items-start justify-end mt-4 p-2 border border-solid ">
          <div className="flex items-center">
            <span className="mr-4">카테고리</span>
            <DropdownInput
              dropDownOptions={CATEGORY_OPTIONS}
              id="category"
              name="category"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
              defaultValue="상품 쉐어링"
              value={category}
            />
          </div>

          <div>
            <span className="mr-4">거리설정</span>
            <ToggleButtons
              alignment={alignment}
              handleAlignment={handleAlignment}
              toggleValues={TOGGLE_VALUES}
            />
          </div>
        </div>
      )} */}
      {isLoading && (
        <CircleLoading message="쉐어링 목록을 불러오는 중입니다. 잠시만 기다려주세요" />
      )}
      <TabPanel currentTab={currentTab} index={0}>
        <NearByList sharingLists={data?.data} />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <NearByList sharingLists={data?.data} />
      </TabPanel>
      <Pagination
        count={data?.pageInfo.totalPages || 1}
        page={data?.pageInfo.page || 1}
        color="primary"
        onChange={handlePagination}
      />
    </div>
  );
};
export default Index;

export async function getServerSideProps(context: any) {
  const {
    lat,
    lng,
    address,
    searchOption,
    keyword,
    type,
    selectedAddressBookId,
  } = context?.query;
  // console.log('SSR selectedAddressBook ::', selectedAddressBookId);

  const requestData = {
    lat: Number(lat),
    lng: Number(lng),
    address: decodeURIComponent(address),
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['sharingListInMap'], getAllSharingPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient) || '',
      lat: requestData.lat || 0,
      lng: requestData.lng || 0,
      address: requestData.address || '',
      searchOption: searchOption || '주소',
      keyword: keyword || '',
      type: type || 1,
      selectedAddressBookId: selectedAddressBookId || '',
    },
  };
}
