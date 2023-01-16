import { useMutation } from '@tanstack/react-query';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState, useCallback, useRef } from 'react';
import { inputType, uploadPostType } from './useInputType';

function useInput(
  initialValue: inputType,
  callbackFn: (variables: uploadPostType) => void
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
    const refreshToken: string =
      'Refresh: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpYXQiOjE2NzM1OTI5MzcsImV4cCI6MTY3MzYxODEzN30.dEO0yx9cEKDJv1Z9zljS1FUPCOl6WdfKIudNL_6V7kVB1ZlqyVM8_1QvcH_c7zlNPd_pZBqfg_6ZSe8Ycmm2tg';
    const accessToken: string =
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoidGVzdDJAZ21haWwuY29tIiwic3ViIjoidGVzdDJAZ21haWwuY29tIiwiaWF0IjoxNjczNTkyOTM3LCJleHAiOjE2NzM1OTUzMzd9.ejHVTWzZS5bLrfQiFB7r04c7U-dTQtyK1HpTmaCVEM6qa_Qziet018RaO9oBjMh5c1D3Svo6zaMWqsv2hsXFgQ';
    const requestBody: uploadPostType = {
      ...inputValue,
      //아래 부분은 하드코딩했습니다.
      latitude: '37.6213085353565',
      longitude: '127.083296516416',
      deadLine: '2023-01-23',
      accessToken,
      refreshToken,
    };
    callbackFn(requestBody);
  };
  return [inputValue, onChange, handleSubmit] as const;
}

export default useInput;
