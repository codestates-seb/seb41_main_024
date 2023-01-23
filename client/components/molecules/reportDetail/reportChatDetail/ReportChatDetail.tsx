import { Button } from '@mui/material';

const ReportChatDetail = () => {
  return (
    <div className='flex'>
      <Button className='flex-1'>조회하기</Button>
      <Button className='flex-1'>닉네임 정지하기</Button>
      <Button className='flex-1'>유저 정지하기</Button>
      <Button className='flex-1'>참가자 정지하기</Button>
    </div>
  )
}

export default ReportChatDetail;