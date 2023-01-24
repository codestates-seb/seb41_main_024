import React from 'react';
import { Button } from '@mui/material';
import { Fragment } from 'react';
import {reportChatDetailType} from './reportChatDetail'

const ReportChatDetail = ({handleGetChatLog, chatLog}:reportChatDetailType) => {
  console.log(chatLog)
  return (
    <Fragment>
      <div className='flex'>
        <Button className='flex-1' onClick={handleGetChatLog}>조회하기</Button>
        <Button className='flex-1'>닉네임 정지하기</Button>
        <Button className='flex-1'>유저 정지하기</Button>
        <Button className='flex-1'>참가자 정지하기</Button>
      </div>
      {/* {chatLog && chatLog.map((log) => )} */}
    </Fragment>
  )
}

export default ReportChatDetail;