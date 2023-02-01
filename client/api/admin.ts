import axios from 'axios';
import Cookies from 'js-cookie';

export const getQuestions = () => {
  return axios({
    url: `https://ngether.site/api/qna/questions`,
    method: 'get',
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
}

export const getReport = async (page:number) => {
  const reports = await axios({
    url: `https://ngether.site/api/reports/admin/list?page=${page}&size=10`,
    method: 'get',
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
  return reports.data;
}

export const handleDeleteReport = (reportId:number) => {
  return axios({
    url: `https://ngether.site/api/reports/${reportId}`,
    method: 'delete',
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
}

export const handleAnswerQuestion = (variables: {qnaId: number, content: string}) => {
  return axios({
    url: `https://ngether.site/api/answer/qna/${variables.qnaId}`,
    method: 'post',
    data: {content: variables.content},
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
}

export const handleBlockUser = (nickName:string | undefined) => {
  axios({
    url: `https://ngether.site/api/reports/admin/changeMemberNickNameRole?nickName=${nickName}`,
    method: 'patch',
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
}
