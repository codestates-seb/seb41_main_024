import { chatRowType } from '../chatRow/chatRowType';
import { chatGroupType } from './chatGroupType';
import ChatRow from '../chatRow/ChatRow';

const ChatGroup = ({ chatData }: chatGroupType  ) => {
  return (
    <div className="mx-[1.25rem]">
      {chatData.map(({thumbSrc, chatMessageId, nickName, message, createDate, type}: chatRowType) => {
        if(type !== 'TALK') {
        return (
            <div key={chatMessageId} className="flex justify-center my-9 mx-0">
              <strong className="inline-block py-[0.5rem] px-[1.25rem] bg-[rgba(217,217,217,0.3)] text-[#fff] font-normal leading-4 rounded">
                {message}
              </strong>
            </div>
          )
        }
        
        return (
          <ChatRow
            key={chatMessageId}
            type={type}
            thumbSrc={thumbSrc}
            nickName={nickName}
            message={message}
            createDate={createDate}
          />
        );
      })}
    </div>
  );
};

export default ChatGroup;
