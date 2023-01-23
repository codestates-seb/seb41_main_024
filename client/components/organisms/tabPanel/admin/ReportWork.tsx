import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

import ReportBoardDetail from '../../../molecules/reportDetail/reportBoardDetail/ReportBoardDetail'
import ReportChatDetail from '../../../molecules/reportDetail/reportChatDetail/ReportChatDetail'


const DUMMY_REPORT = [
  {type: '게시글', reportId: 1, id: 1, title: '주식 리빙방 운영합니다'},
  {type: '채팅방', reportId: 2, id: 2, title: '채팅 사기 치려고 합니다'}
];


const ReportWork = () => {
  const router = useRouter();
  
  const handleNavigate = (id:number) => {
    router.push(`/nearby/${id}`)
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
                    <Typography>{`신고된 ${report.type} | ${report.title}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {report.type === '게시글' && <ReportBoardDetail handleNavigate={()=>handleNavigate(report.reportId)}/>} 
                    {report.type === '채팅방' && <ReportChatDetail />} 
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





