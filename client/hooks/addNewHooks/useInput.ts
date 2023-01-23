import { useMutation, UseMutateFunction } from '@tanstack/react-query';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState, useCallback, useRef } from 'react';
import { inputType, uploadPostType, searchUseInputType } from './useInputType';

function useInput(initialValue: inputType & searchUseInputType) {
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

  return { inputValue, onChange } as const;
}

export default useInput;
