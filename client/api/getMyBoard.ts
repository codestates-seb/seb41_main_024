import { getApiIncludingAuthRef } from '../utils/getApiIncludingAuthRef/getApiIncludingAuthRef';

export default function getMyBoard(page: number = 1, size: number = 10) {
  return getApiIncludingAuthRef(
    `/api/members/myBoard?page=${page}&size=${size}`
  );
}
