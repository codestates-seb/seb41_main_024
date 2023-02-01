import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';


import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getReport, handleBlockUser, handleDeleteReport } from '../../../api/admin';
import ReportBoardDetail from '../../molecules/reportDetail/reportBoardDetail/ReportBoardDetail';
import ReportChatDetail from '../../molecules/reportDetail/reportChatDetail/ReportChatDetail';
import { getChatDataset } from '../../../api/getChatDataset';
import { Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import CircleLoading from '../../organisms/circleLoading/CircleLoading';
import { transDateFullFormat } from '../../../utils/transDateFormat/transDateFormat';

interface reportType {
  reportType: string;
  reportId: number;
  reportedId: number;
  title: number
}

const ReportWork = () => {
  const router = useRouter();
  const [reports, setResports] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1
  });
  const {data, isSuccess, refetch} = useQuery(['reports', pageInfo.page], () => getReport(pageInfo.page), 
  { 
    keepPreviousData : true
  });

  useEffect(() => {
    if(isSuccess) {
      setResports(data.data);
      setPageInfo(data.pageInfo);
    }
  }, [pageInfo.page, data])

  const reportMutation = useMutation(handleDeleteReport, {
    onSuccess: () => {
      refetch();
    }
  });

  const handleNavigate = (id:number, reportId:number) => {
    localStorage.setItem('reportId', String(reportId));
    router.push(`/nearby/${id}`);
  }
  
  const handleDelete = async (reportId: number) => {
    await reportMutation.mutate(reportId);
  };


  return (
    <div className='flex flex-col text-center'>
      {!isSuccess && <CircleLoading message="잠시만 기다려 주세요." />}
      {isSuccess && reports && (
        <>
          <p className='my-[16px] text-xs'>게시물은 해당 게시글로 이동하여 처리하실 수 있습니다.</p>
          <div className='h-[calc(100vh-350px)] overflow-x-hidden overflow-scroll'>
            <ul>
                {reports.map((report:reportType) => {
                  return (
                    <li key={report.reportId} className='mb-1'>
                      <Accordion >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                            <Typography className='text-left'>
                              <span className='text-gray-400'>{`신고된 ${report.reportType === 'board' && '게시글' || '채팅방'}`}</span> 
                              <span className='ml-6'>{report.title}</span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {report.reportType === 'board' 
                          && <ReportBoardDetail 
                              handleNavigate={()=>handleNavigate(report.reportedId, report.reportId)}
                              handleDeleteReport={()=>handleDelete(report.reportId)}
                          />} 
                          {report.reportType === 'chat' 
                          && <ReportChatDetail
                              id={report.reportedId}
                              reportId={report.reportId}
                              refetch={refetch}
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
          <div className="flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={pageInfo.totalPages}
                page={pageInfo.page}
                color="primary"
                onChange={(event, value) => {
                  console.log(pageInfo, value)
                  setPageInfo((prevState) => {
                    return {...prevState, page: value}
                  });
                }}
              />
            </Stack>
          </div>
        </>
      )
    }
  </div>
  )
}

export default ReportWork;