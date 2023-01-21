import { useMutation, UseMutateFunction } from '@tanstack/react-query';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState, useCallback, useRef } from 'react';
import { inputType, uploadPostType } from './useInputType';

function useInput(
  initialValue: inputType,
  mutate: UseMutateFunction<any, unknown, any, unknown>,
  token: any
) {
  const [inputValue, setInputValue] = useState(initialValue);

  /* const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }; */
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //토큰 일단 하드코딩했습니다.

    const requestBody: uploadPostType = {
      ...inputValue,
      //아래 부분은 하드코딩했습니다.
      latitude: inputValue.lat,
      longitude: inputValue.lng,
      address: inputValue.address,
      accessToken: token.authorization,
      refreshToken: token.refresh,
    };
    mutate(requestBody);
  };
  return { inputValue, onChange, handleSubmit } as const;
}

export default useInput;
