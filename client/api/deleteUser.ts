import axios from 'axios';

const REQUEST_URL = 'https://ngether.site';

export function deleteUser(id: string) {
  return axios.delete(`${REQUEST_URL}/api/members/${id}`);
}
