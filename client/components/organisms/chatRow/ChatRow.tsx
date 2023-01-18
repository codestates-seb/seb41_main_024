import classnames from 'classnames';
import { chatRowType } from './chatRowType';
import { Cookies } from 'react-cookie';



const ChatRow = ({ thumbSrc, nickName, message, createDate }: chatRowType) => {
  const cookies = new Cookies();
  const myChat = cookies.get('nickName') === nickName;
  const otherChat = cookies.get('nickName') !== nickName
  
  return (
    <div
      className={classnames('mt-[1.625rem] first:mt-0', {
        'flex flex-row-reverse': myChat
      })}
    >
      <div
        className={classnames('flex items-start max-w-[31.25rem]', {
          'flex-row-reverse': myChat
        })}
      >
        {(otherChat && thumbSrc) && (
          <span className="min-w-[2.8125rem] h-[2.8125rem] rounded-full overflow-hidden">
            <img
              src={thumbSrc}
              alt=""
              className="block w-full h-full object-cover"
            />
          </span>
        )}

        <span
          className={classnames('inline-flex flex-col ml-[0.75rem]', {
            'mr-[0.75rem]': myChat
          })}
        >
          {otherChat && (
            <span className="block text-[#fefefe] my-[0.375rem]">{nickName}</span>
          )}
          <span
            className={classnames(
              'inline-flex pt-[0.812rem] pb-[0.875rem] px-[1rem] rounded leading-[1.125rem] break-all',
              { 'bg-[#fff]': otherChat },
              { 'bg-[#faff00] ': myChat }
            )}
          >
            {message}
          </span>
        </span>
        <span className="min-w-[3.25rem] text-[0.75rem] leading-[0.875rem] text-[#fff] self-end pb-[0.0625rem]">
          {createDate}
        </span>
      </div>
    </div>
  );
};

export default ChatRow;
