import Input from '../../components/atoms/input/Input';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import {
  Button,
  FormControl,
  FormHelperText,
  Popover,
  Typography,
} from '@mui/material';
import NoContent from '../../components/molecules/noContent/NoContent';
import React, { useEffect, useState } from 'react';
import { exchangeCoordToAddress, searchMap } from '../../api/kakaoMap';
import { getAddressBooks, getCurrentLocation } from '../../api/location';
import FormButton from '../../components/molecules/formbutton/FormButton';
import useInput from '../../hooks/addNewHooks/useInput';
import { useQuery } from '@tanstack/react-query';
import {
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from '../../api/post';
import { useRouter } from 'next/router';
import useSearch from '../../hooks/search/useSearch';
import AddressBookList from '../../components/organisms/addressBookList/AddressBookList';
import Cookies from 'js-cookie';
import { locationDataType } from '../../components/container/addressBook/AddressBook';
import Link from 'next/link';

const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];
const SEARCH_OPTIONS = [
  { label: '주소', value: '주소' },
  { label: '글 제목', value: '글 제목' },
  { label: '글 내용', value: '글 내용' },
  { label: '작성자', value: '작성자' },
];
const Search = () => {
  // 이곳의 폼 데이터 관리도 useState, useRef, react-hook-form 등 기호에 맞게 사용하시면 됩니다
  const router = useRouter();
  const [token, setToken] = useState({ Authorization: '', Refresh: '' });
  const [targetCoord, setTargetCoord] = useState<any>({
    lat: 37.517331925853,
    lng: 127.047377408384,
    address: '서울 강남구',
  });
  const [isSearch, setIsSearch] = useState(false);

  const [center, setCenter] = useState<any>({ lat: 0, lng: 0, address: '' });
  const [error, setError] = useState('');
  const { inputValue, onChange } = useInput({
    title: '',
    searchOption: '주소',
    category: '상품 쉐어링',
    //타입 에러 떄문에 추가된 value들입니다.
    //useInput을 addnew와 search가 같이 사용하다보니.. 아래 4개의 필드는 search에서는 필요 없습니다.
    productsLink: '',
    maxNum: 0,
    content: '',
    deadLine: '',
  });
  const [searchAddress, setSearchAddress] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleSearchAddress = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchAddress(e.target.value);
  };
  useEffect(() => {
    setToken({
      Authorization: Cookies.get('access_token') || '',
      Refresh: Cookies.get('refresh_token') || '',
    });
    getCurrentLocation(setCenter, setError);
    setIsSearch((prev) => !prev);
  }, []);
  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center.lat, center.lng, isSearch]);
  const { title, searchOption } = inputValue;
  const finalLocation = targetCoord.address ? targetCoord : center;

  const argumentOfLocation = {
    locationData: finalLocation,
    range: 1.5,
    category: 'product',
    page: 1,
    size: 10,
  };

  const argumentOfTitle = { keyword: title, page: 1, size: 300 };
  /* const { refetch } = useSearch({
    searchOption,
    argumentOfLocation,
    argumentOfTitle,
  }); */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      range,
      category,
      page,
      size,
      locationData: { lat, lng, address },
    } = argumentOfLocation;
    const { keyword, page: titlePage, size: titleSize } = argumentOfTitle;
    const type =
      searchOption === '글 제목' ? 1 : searchOption === '글 내용' ? 2 : 3;
    const query = {
      searchOption,
      type,
      keyword,
      page: page || titlePage,
      size: size || titleSize,
      lat,
      lng,
      address,
      range,
      category,
    };
    router.push({ pathname: '/nearby', query }, '/nearby');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectAddress = (locationData: locationDataType) => {
    const coordsAndAddress = {
      lat: locationData.latitude,
      lng: locationData.longitude,
      address: locationData.address,
    };

    setTargetCoord(coordsAndAddress);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { data } = useQuery({
    queryKey: ['addressBooks'],
    queryFn: () =>
      getAddressBooks({
        Authorization: Cookies.get('access_token') || '',
        Refresh: Cookies.get('refresh_token') || '',
      }),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 30,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col max-w-lg mt-3 w-[100%] relative">
        <div id="map" className="w-[100%] h-[350px]"></div>
        <div
          className={`${
            searchOption !== '주소'
              ? 'bg-[gray] bg-none w-[100%] h-[350px] absolute left-0 z-[6] flex items-center justify-center ani_fadeIn'
              : ''
          }`}
        >
          {searchOption !== '주소'
            ? `${searchOption} 검색은 위치 검색 지원이 되지 않습니다. 자동으로 현재 위치로 이동합니다`
            : ''}
        </div>
        <p className="mb-4">
          <em>지도를 클릭하면 더 정확한 주소를 검색할 수 있습니다</em>
        </p>
        <div className="flex w-[100%] mb-4">
          <Input
            id="location"
            name="location"
            type="text"
            label="도로명•지번주소 검색"
            onKeyDown={(e: KeyboardEvent) => {
              setIsSearch((prev) => !prev);
              if (e.key === 'Enter') return searchMap(searchAddress, setCenter);
            }}
            onChange={handleSearchAddress}
            helperText="ex) OO시 OO구, 이문로"
          />
          <FormButton
            variant="contained"
            className="bg-[#63A8DA] text-[white] ml-[10px] h-[52px]"
            content="주소검색"
            onClick={() => {
              setIsSearch((prev) => !prev);
              searchMap(searchAddress, setCenter);
            }}
          ></FormButton>
          <FormButton
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            content="나의 주소록"
            className="bg-[skyblue] text-[white] ml-[10px] h-[52px]"
          ></FormButton>
          <Popover
            id={id}
            open={open}
            slot="div"
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography component="div" sx={{ p: 2 }}>
              {data?.data[0] ? (
                <AddressBookList
                  addressBookList={data?.data}
                  content="선택"
                  buttonColor="skyblue"
                  selectAddress={selectAddress}
                />
              ) : (
                <>
                  <div className="mb-2">
                    등록된 주소록이 없습니다. 등록하시겠습니까?
                  </div>
                  <Link
                    href="/mypage"
                    className="bg-[skyblue] py-1 px-2 border-[0] border-indigo-500/100 border-solid rounded-md"
                  >
                    등록하러 가기
                  </Link>
                  {!token.Authorization && (
                    <Link
                      href="/login"
                      className="bg-[orange] ml-3 py-1 px-2 border-[0] border-indigo-500/100 border-solid rounded-md"
                    >
                      로그인하러 가기
                    </Link>
                  )}
                </>
              )}
            </Typography>
          </Popover>
        </div>
        <FormControl
          fullWidth
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <DropdownInput
            dropDownOptions={SEARCH_OPTIONS}
            id="searchOption"
            name="searchOption"
            label="검색옵션"
            width="150px"
            value={searchOption}
            defaultValue="주소"
            onChange={onChange}
          />
          <Input
            className="ml-4"
            id="title-input"
            name="title"
            type="text"
            label="글 제목 • 주소 검색"
            fullWidth
            onChange={onChange}
            {...(searchOption === '주소' && { disabled: true })}
            value={
              searchOption === '주소'
                ? targetCoord.address || center.address
                : title
            }
          />
        </FormControl>
        <form onSubmit={handleSubmit}>
          <FormButton
            content="검색하기"
            className="h-14 mt-4 w-[100%]"
            variant="contained"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
