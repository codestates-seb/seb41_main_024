import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

import ReportBoardDetail from '../../../molecules/reportDetail/reportBoardDetail/ReportBoardDetail'
import ReportChatDetail from '../../../molecules/reportDetail/reportChatDetail/ReportChatDetail'
import { handleBlockUser, handleDeleteReport } from '../../../../api/admin';
import { getChatDataset } from '../../../../api/getChatDataset';


const DUMMY_REPORT = [
  {reportType: 'board', reportId: 1, reportedId: 24, title: '주식 리빙방 운영합니다'},
  {reportType: 'chat', reportId: 2, reportedId: 24, title: '채팅 사기 치려고 합니다'}
];


const ReportWork = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col text-center'>
      <p className='mb-4 '>게시물은 해당 게시글로 이동하여 처리하실 수 있습니다.</p>
      <ul>
          {DUMMY_REPORT.map((report) => {
            return (
              <li key={report.reportId} className='mb-2'>
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
                        handleNavigate={()=>router.push(`/nearby/${report.reportedId}`)}
                        handleDeleteReport={()=>handleDeleteReport(report.reportId)}
                    />} 
                    {report.reportType === 'chat' 
                    && <ReportChatDetail
                        id={report.reportedId}
                        handleGetChatLog={getChatDataset}
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





