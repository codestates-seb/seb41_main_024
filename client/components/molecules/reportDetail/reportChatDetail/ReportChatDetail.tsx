import React, { Fragment, useEffect, useState } from 'react';
import { Button, Divider } from '@mui/material';
import { reportChatDetailType } from './reportChatDetailType'
import DialogButton from '../../../organisms/DialogButton/DialogButton';
import { transDateFullFormat } from '../../../../utils/transDateFormat/transDateFormat';

interface ChatLogType {
  chatMessageId : number;
  chatRoomId : number;
  createDate : string;
  message : string;
  nickName : string;
  type : string;
  unreadCount : number;
}

interface ChatDataSetType {
  chatLog: ChatLogType[];
  chatMembers: string[];
}

const ReportChatDetail = ({id, handleGetChatLog, handleBlockUser, handleDeleteReport}: reportChatDetailType) => {
  const [chatDataSet, setChatDataSet] = useState<ChatDataSetType>({ chatLog: [], chatMembers: [] });
  const [isLookUp, setIsLookUp] = useState(false);

  useEffect(() => {
    setChatDataSet(handleGetChatLog(id))
  },[])

  const handleRenderChatLog = () => {
    setIsLookUp(!isLookUp);
  }

  return (
    <Fragment>
      <div className='flex'>
        <Button className='flex-1' onClick={handleRenderChatLog}>조회하기</Button>
        <Button className='w-[100px]' onClick={handleDeleteReport}>신고 처리완료</Button>
        <Button className='w-[100px]' onClick={handleDeleteReport}>신고 반려</Button>
      </div>
      {isLookUp && 
      <div>
        <p className='text-xs mt-2'>정지할 아이디</p>
        {chatDataSet.chatMembers.map((nickName:string, index) => 
          <DialogButton 
            key={index} 
            name={nickName} 
            title={`${nickName}을 정지시키겠습니까?`}
            question={`네를 선택하시면 ${nickName} 유저를 정지합니다.`}
            func={() => handleBlockUser(nickName)}
          />
        )}
        <Divider />
        <ul className='flex flex-col mt-2 max-h-[400px] overflow-auto'>
          {chatDataSet.chatLog.map((log:ChatLogType) => 
            <li className='text-left text-s mt-3 mb-2 border-b-2' key={log.chatMessageId}>
              <div><p>{log.nickName} : {log.message}</p></div>
              <p className='text-xs'>전송 시간:{transDateFullFormat(log.createDate)}</p>
            </li>
          )}
        </ul>
      </div>
      }
    </Fragment>
  )
}

export default ReportChatDetail;