import Input from '../../components/atoms/input/Input';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import NearByPageTab from '../../components/organisms/tab/nearByPageTab/NearByPageTab';
import { FormControl, FormHelperText } from '@mui/material';
import { useState } from 'react';
import NoContent from '../../components/molecules/noContent/NoContent';

const Search = () => {
  // 이곳의 폼 데이터 관리도 useState, useRef, react-hook-form 등 기호에 맞게 사용하시면 됩니다
  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col max-w-lg mt-3">
        <DropdownInput />
        <FormControl className="w-[328px] m-2">
          <Input
            id={'title-input'}
            name="title"
            type={'text'}
            label={'제품명 • 주소 검색'}
          />
          <FormHelperText id="title-input-helper-text">
            검색하실 키워드를 입력해주세요
          </FormHelperText>
        </FormControl>
      </form>
      <NoContent />
      <NearByPageTab />
    </div>
  );
};

export default Search;
