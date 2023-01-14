import { ChatRowPropsType } from '../chatRow/ChatRowPropsType';
import { ChatGroupPropsType } from './ChatGroupPropsType';
import ChatRow from '../chatRow/ChatRow';

const ChatGroup = ({ chatData }: ChatGroupPropsType) => {
  return (
    <div className="mx-[1.25rem]">
      {chatData.map((data: ChatRowPropsType, idx: number) => {
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
