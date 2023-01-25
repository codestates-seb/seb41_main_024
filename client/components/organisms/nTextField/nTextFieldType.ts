import { TextFieldProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
export type nTextFieldType = TextFieldProps & {
  validation: boolean;
  maxLength?: number;
  setFormValue?: Dispatch<
    SetStateAction<{
      email: string;
      nickName: string;
      phoneNumber: string;
      pw: string;
    }>
  >;
  formValue?: {
    email: string;
    nickName: string;
    phoneNumber: string;
    pw: string;
  };
};
