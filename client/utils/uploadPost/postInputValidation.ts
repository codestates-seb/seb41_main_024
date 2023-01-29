import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface postValidationPropsType {
  title: string;
  address: string;
  productsLink: string;
  maxNum: number;
  deadLine: string | number | Date;
  content: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAlertOption: Dispatch<
    SetStateAction<{
      severity: AlertColor;
      value: string;
    }>
  >;
}

export const validatePostInput = ({
  title,
  address,
  productsLink,
  maxNum,
  deadLine,
  content,
  setOpen,
  setAlertOption,
}: postValidationPropsType) => {
  if (title === '') {
    setOpen(true);
    setAlertOption({ severity: 'error', value: '제목을 입력해주세요' });
    return false;
  } else if (address.trim() === '') {
    setOpen(true);
    setAlertOption({
      severity: 'error',
      value: '쉐어링 위치를 등록해주세요',
    });
    return false;
  } else if (productsLink?.trim() === '') {
    setOpen(true);
    setAlertOption({
      severity: 'error',
      value: '상품 링크를 등록해주세요',
    });
    return false;
  } else if (maxNum && maxNum <= 1) {
    setOpen(true);
    setAlertOption({
      severity: 'error',
      value: '모집 인원을 2명 이상 설정해주세요',
    });
    return false;
  } else if (
    new Date(deadLine).valueOf() < new Date().valueOf() ||
    deadLine === ''
  ) {
    setOpen(true);
    setAlertOption({
      severity: 'error',
      value: '현재 시간보다 빠른 시간을 지정할 수 없습니다.',
    });
    return false;
  } else if (content?.trim() === '') {
    setOpen(true);
    setAlertOption({
      severity: 'error',
      value: '내용을 입력해주세요',
    });
    return false;
  }
  return true;
};
