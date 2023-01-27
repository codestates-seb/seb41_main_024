import axios from 'axios';
import Cookies from 'js-cookie';

export const handleDeleteReport = (reportId:number) => {
  axios({
    url: `https://ngether.site/api/reports/${reportId}`,
    method: 'delete',
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
}

export const handleBlockUser = (nickName:string) => {
  axios({
    url: `https://ngether.site/api/reports/admin/changeMemberNickNameRole?nickName=${nickName}`,
    method: 'patch',
    headers: {
      Authorization : Cookies.get('access_token')
    }
  })
}
