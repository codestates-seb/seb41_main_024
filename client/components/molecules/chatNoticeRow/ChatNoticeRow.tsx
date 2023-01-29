import React from 'react';
import { chatNoticeRowType } from './chatNoticeRowType';

const CLASS_STRING = "py-[0.5rem] px-[1.25rem] text-[#fff] font-normal leading-4"

const ChatNoticeRow = ({message}: chatNoticeRowType ) => {
  return (
    <div className="flex justify-center my-9 mx-0">
        {typeof message === 'string' && (
          <strong className="inline-block py-[0.5rem] px-[1.25rem] bg-[rgba(217,217,217,0.3)] text-[#fff] font-normal leading-4 rounded">
            {message}
          </strong>
        )}
        {typeof message === 'object' &&
          <div className='flex flex-col text-center bg-[rgba(217,217,217,0.3)]'>
            <strong className={CLASS_STRING}>{message[0]}</strong>
            <strong className={CLASS_STRING}>{message[1]}</strong>
            <strong className={CLASS_STRING}>{message[2]}</strong>
          </div>
        }
    </div>
  )
}

export default ChatNoticeRow;