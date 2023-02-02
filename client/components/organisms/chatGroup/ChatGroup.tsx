import { chatRowType } from '../chatRow/chatRowType';
import { chatGroupType } from './chatGroupType';
import ChatRow from '../chatRow/ChatRow';
import ChatNoticeRow from '../../molecules/chatNoticeRow/ChatNoticeRow';

const ChatGroup = ({ chatData }: chatGroupType  ) => {
  return (
    <div className="mx-[1.25rem]">
      {chatData.map(({imageLink, chatMessageId, nickName, message, createDate, type, unreadCount}: chatRowType) => {
        if(type === 'ENTER' || type === 'LEAVE' || type === 'BAN') {
          return <ChatNoticeRow key={chatMessageId} message={message}/>;
        }

        if(type === 'NOTICE') {
          return <ChatNoticeRow key={chatMessageId} message={message.split("\n")}/>
        }

        if(type === 'REENTER') return;     

        return (
          <ChatRow
            key={chatMessageId}
            type={type}
            imageLink={imageLink}
            nickName={nickName}
            message={message}
            createDate={createDate}
            unreadCount={unreadCount}
          />
        );
      })}
    </div>
  );
};

export default ChatGroup;
