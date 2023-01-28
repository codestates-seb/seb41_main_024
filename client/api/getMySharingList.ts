import { getApiIncludingAuthRef } from '../utils/getApiIncludingAuthRef/getApiIncludingAuthRef';

export default function getMySharingList(page: number = 1, size: number = 10) {
  return getApiIncludingAuthRef(
    `/api/members/sharingList?page=${page}&size=${size}`
  );
}
