import { getApiIncludingAuthRef } from '../utils/getApiIncludingAuthRef/getApiIncludingAuthRef';

export default function getMyQna(page: number = 1, size: number = 10) {
  return getApiIncludingAuthRef(`/api/qna?page=${page}&size=${size}`);
}
