import { getApiIncludingAuthRef } from '../utils/getApiIncludingAuthRef/getApiIncludingAuthRef';

export default function getMyLike(page: number = 1, size: number = 10) {
  return getApiIncludingAuthRef(`/api/members/like?page=${page}&size=${size}`);
}
