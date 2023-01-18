import { useMutation, UseMutateFunction } from '@tanstack/react-query';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState, useCallback, useRef } from 'react';
import { inputType, uploadPostType } from './useInputType';

function useInput(
  initialValue: inputType,
  mutate: UseMutateFunction<any, unknown, any, unknown>
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
    const refreshToken = process.env.NEXT_PUBLIC_REFRESH_TOKEN;
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

    const requestBody: uploadPostType = {
      ...inputValue,
      //아래 부분은 하드코딩했습니다.
      latitude: '37.6213085353565',
      longitude: '127.083296516416',
      deadLine: '2023-01-23',
      accessToken,
      refreshToken,
    };
    mutate(requestBody);
  };
  return { inputValue, onChange, handleSubmit } as const;
}

export default useInput;
