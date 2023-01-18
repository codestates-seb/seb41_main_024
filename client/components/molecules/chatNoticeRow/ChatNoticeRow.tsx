import React from 'react';
import { chatNoticeRowType } from './chatNoticeRow';

const ChatNoticeRow = ({key, message}: chatNoticeRowType ) => {
  return (
    <div key={key} className="flex justify-center my-9 mx-0">
      <strong className="inline-block py-[0.5rem] px-[1.25rem] bg-[rgba(217,217,217,0.3)] text-[#fff] font-normal leading-4 rounded">
        {message}
      </strong>
    </div>
  )
}

export default ChatNoticeRow;