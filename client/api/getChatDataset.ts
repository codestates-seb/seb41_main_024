import axios from 'axios';
import Cookies from 'js-cookie';

export const getChatDataset = (id: number) => {
  const CHAT_DATA = {
    chatLog: [],
    chatMembers: []
  }
  axios.get(`https://ngether.site/chat/room/messages/${id}`, {headers : {Authorization :Cookies.get('access_token')}})
  .then(res => CHAT_DATA.chatLog = res.data)
  axios.get(`https://ngether.site/chat/room/${id}/memberList`, {headers : {Authorization :Cookies.get('access_token')}})
  .then(res => CHAT_DATA.chatMembers = res.data.map((member: { memberId: number, nickName: string; }) => member.nickName))

  return CHAT_DATA
}
