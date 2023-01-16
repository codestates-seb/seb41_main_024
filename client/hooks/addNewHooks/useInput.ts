import { SelectChangeEvent } from '@mui/material/Select';
import { useState, useCallback, useRef } from 'react';
import { inputType } from './useInputType';

function useInput(initialValue: inputType) {
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

  return [inputValue, onChange, setInputValue] as const;
}

export default useInput;
