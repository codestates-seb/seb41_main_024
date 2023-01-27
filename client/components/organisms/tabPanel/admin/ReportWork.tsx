import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

import ReportBoardDetail from '../../../molecules/reportDetail/reportBoardDetail/ReportBoardDetail'
import ReportChatDetail from '../../../molecules/reportDetail/reportChatDetail/ReportChatDetail'
import axios from 'axios';
import { transDateFormChatMessage } from '../../../../hooks/useWebSocketClient';
import { useState } from 'react';
import Cookies from 'js-cookie';


const DUMMY_REPORT = [
  {reportType: 'board', reportId: 1, reportedId: 1, title: '주식 리빙방 운영합니다'},
  {reportType: 'chat', reportId: 2, reportedId: 35, title: '채팅 사기 치려고 합니다'}
];


const ReportWork = () => {
  const token = Cookies.get('access_token');
  const router = useRouter();

  const handleNavigate = (reportedId:number) => {
    router.push(`/nearby/${reportedId}`)
  }

  const handleDeleteReport = (reportId:number) => {
    axios({
      url: `https://ngether.site/api/reports/${reportId}`,
      method: 'delete',
      headers: {
        Authorization : token
      }
    })
  }

  const handleBlockUser = (nickName:string) => {
    axios({
      url: `https://ngether.site/api/reports/admin/changeMemberNickNameRole?nickName=${nickName}`,
      method: 'patch',
      headers: {
        Authorization : token
      }
    })
  }

  const handleGetChatLog = (id: number, token: {Authorization : string | undefined}) => {
    const CHAT_DATA = {
      chatLog: [],
      chatMembers: []
    }
    axios.get(`https://ngether.site/chat/room/messages/${id}`, {headers : token})
    .then(res => CHAT_DATA.chatLog = res.data)
    axios.get(`https://ngether.site/chat/room/${id}/memberList`, {headers : token})
    .then(res => CHAT_DATA.chatMembers = res.data.map((member: { memberId: number, nickName: string; }) => member.nickName))

    return CHAT_DATA
  }

  return (
    <div className='flex flex-col text-center'>
      <p className='mb-4 '>게시물은 해당 게시글로 이동하여 처리하실 수 있습니다.</p>
      <ul>
          {DUMMY_REPORT.map((report) => {
            return (
              <li className='mb-3' key={report.reportId}>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{`신고된 ${report.reportType === 'board' && '게시글' || '채팅방'} | ${report.title}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {report.reportType === 'board' 
                    && <ReportBoardDetail 
                        handleNavigate={()=>handleNavigate(report.reportedId)}
                        handleDeleteReport={()=>handleDeleteReport(report.reportId)}
                    />} 
                    {report.reportType === 'chat' 
                    && <ReportChatDetail
                        id={report.reportedId}
                        token={{Authorization: token}}
                        handleGetChatLog={handleGetChatLog}
                        handleBlockUser={handleBlockUser}
                        handleDeleteReport={()=>handleDeleteReport(report.reportId)}
                    />} 
                  </AccordionDetails>
                </Accordion>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default ReportWork;





