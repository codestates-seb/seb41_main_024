import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

import ReportBoardDetail from '../../../molecules/reportDetail/reportBoardDetail/ReportBoardDetail'
import ReportChatDetail from '../../../molecules/reportDetail/reportChatDetail/ReportChatDetail'
import { getReport, handleBlockUser, handleDeleteReport } from '../../../../api/admin';
import { getChatDataset } from '../../../../api/getChatDataset';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface reportType {
  reportType: string;
  reportId: number;
  reportedId: number;
  title: number
}

const ReportWork = () => {
  const router = useRouter();
  const [reports, setResports] = useState([])
  const {data, isSuccess, refetch} = useQuery(['reports'], getReport);

  
  const reportMutation = useMutation(handleDeleteReport, {
    onSuccess: () => {
      refetch();
    }
  });
  
  useEffect(()=>{
    setResports(data?.data?.data)
  }, [data])
  
  const handleDelete = async (reportId: number) => {
    await reportMutation.mutate(reportId);
  };


  return (
    <div className='flex flex-col text-center'>
      <p className='mb-[16px] text-xs'>게시물은 해당 게시글로 이동하여 처리하실 수 있습니다.</p>
      <div className='h-[calc(100vh-338px)] overflow-x-hidden overflow-scroll'>
        <ul>
            {isSuccess 
            && reports?.map((report:reportType) => {
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
                          handleDeleteReport={()=>handleDelete(report.reportId)}
                      />} 
                      {report.reportType === 'chat' 
                      && <ReportChatDetail
                          id={report.reportedId}
                          handleGetChatLog={getChatDataset}
                          handleBlockUser={handleBlockUser}
                          handleDeleteReport={()=>handleDelete(report.reportId)}
                      />} 
                    </AccordionDetails>
                  </Accordion>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default ReportWork;