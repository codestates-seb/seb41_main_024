import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

// 디테일 페이지
export function getProductDetail(id: string) {
  return axios.get(`${REQUEST_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 수정하기
export function editProductDetail(id: string, form: any) {
  return axios.patch(`${REQUEST_URL}/api/boards/${id}`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 삭제하기
export function deleteProductDetail(id: string) {
  return axios.delete(`${REQUEST_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 찜하기
export function likeProduct(id: string) {
  return axios.get(`${REQUEST_URL}/api/boards/like/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 찜한 쉐어링 리스트
export function getMyFavorite() {
  return axios.get(`${REQUEST_URL}/api/members/like?page=1&size=10`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 신고하기
export function reportProduct(reportForm: object) {
  return axios.post(`${REQUEST_URL}/api/reports`, reportForm, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 참여하기
export function goChatroom(id: string) {
  return axios.get(`${REQUEST_URL}/chat/room/enter/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 모집 완료
export function completeSharing(id: string) {
  return axios({
    url: `${REQUEST_URL}/api/boards/complete/${id}`,
    method: 'patch',
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export const reportChat = (roomId: string | string[] | undefined) => {
  return axios.post(
    `${REQUEST_URL}/api/reports`,
    { reportedId: roomId, reportType: 'chat' },
    {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    }
  );
};
