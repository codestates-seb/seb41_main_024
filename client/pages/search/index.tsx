import Input from '../../components/atoms/input/Input';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import { FormControl, FormHelperText } from '@mui/material';
import NoContent from '../../components/molecules/noContent/NoContent';
import React, { useEffect, useState } from 'react';
import { exchangeCoordToAddress, searchMap } from '../../api/kakaoMap';
import { getCurrentLocation } from '../../api/location';
import FormButton from '../../components/molecules/formbutton/FormButton';
import useInput from '../../hooks/addNewHooks/useInput';
import { useQuery } from '@tanstack/react-query';
import {
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from '../../api/post';
import { useRouter } from 'next/router';
import useSearch from '../../hooks/search/useSearch';

const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];
const SEARCH_OPTIONS = [
  { label: '주소', value: '주소' },
  { label: '글 제목', value: '글 제목' },
];
const Search = () => {
  // 이곳의 폼 데이터 관리도 useState, useRef, react-hook-form 등 기호에 맞게 사용하시면 됩니다
  const router = useRouter();
  const [targetCoord, setTargetCoord] = useState<any>({
    lat: 0,
    lng: 0,
    address: '',
  });

  const [center, setCenter] = useState<any>({ lat: 0, lng: 0, address: '' });
  const [error, setError] = useState('');
  const { inputValue, onChange } = useInput({
    title: '',
    searchOption: '주소',
    category: '상품 쉐어링',
  });
  const [searchAddress, setSearchAddress] = useState('');

  const handleSearchAddress = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchAddress(e.target.value);
  };
  useEffect(() => {
    getCurrentLocation(setCenter, setError);
  }, []);
  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center.lat, center.lng]);
  const { title, searchOption, category } = inputValue;
  const categoryValue = category === '상품 쉐어링' ? 'product' : 'delivery';
  const range = category === '상품 쉐어링' ? 1.5 : 0.6;
  const type = 1;
  const finalLocation = targetCoord.address ? targetCoord : center;

  const argumentOfLocation = {
    locationData: finalLocation,
    range,
    category: categoryValue,
    page: 1,
    size: 300,
  };
  const argumentOfTitle = { type, keyword: title, page: 1, size: 300 };
  const { data, refetch } = useSearch({
    searchOption,
    argumentOfLocation,
    argumentOfTitle,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col max-w-lg mt-3 w-[100%]"
        onSubmit={handleSubmit}
      >
        <div id="map" className="w-[100%] h-[350px]"></div>
        <p className="mb-4">
          <em>지도를 클릭해주세요!</em>
        </p>
        <div className="flex width-[100%] mb-4">
          <Input
            id="location"
            name="location"
            type="text"
            label="도로명주소 검색"
            onChange={handleSearchAddress}
          />
          <FormButton
            variant="contained"
            className="bg-[#63A8DA] text-[white] ml-[10px]"
            content="주소검색"
            onClick={() => searchMap(searchAddress, setCenter)}
          ></FormButton>
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
        <DropdownInput
          dropDownOptions={CATEGORY_OPTIONS}
          id="category"
          name="category"
          label="카테고리"
          onChange={onChange}
          defaultValue="상품 쉐어링"
          value={category}
        />
        <FormButton
          content="검색하기"
          className="h-14 mt-4"
          variant="contained"
          type="submit"
        />
      </form>
      <NoContent />
      <NearByPageTab />
    </div>
  );
};

export default Search;
