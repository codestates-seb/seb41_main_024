import { chatRowType } from '../chatRow/chatRowType';
import { chatGroupType } from './chatGroupType';
import ChatRow from '../chatRow/ChatRow';

const ChatGroup = ({ chatData }: any) => {
  return (
    <div className="mx-[1.25rem]">
      {chatData.map((data: any, idx: number) => {
        return (
          <ChatRow
            key={idx}
            myChat={data.myChat}
            thumbSrc={data.thumbSrc}
            nick={data.nick}
            message={data.message}
            time={data.time}
          />
        );
      })}
    </div>
  );
};

export default ChatGroup;
