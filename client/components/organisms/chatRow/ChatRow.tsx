import classnames from 'classnames';
import { chatRowType } from './chatRowType';

const ChatRow = ({ thumbSrc, nick, message, time }: chatRowType) => {
  return (
    <div
      className={classnames('mt-[1.625rem] first:mt-0', {
        'flex flex-row-reverse': !thumbSrc,
      })}
    >
      <div
        className={classnames('flex items-start max-w-[31.25rem]', {
          'flex-row-reverse': !thumbSrc,
        })}
      >
        {thumbSrc && (
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
            'mr-[0.75rem]': thumbSrc,
          })}
        >
          {thumbSrc && (
            <span className="block text-[#fefefe] my-[0.375rem]">{nick}</span>
          )}
          <span
            className={classnames(
              'inline-flex pt-[0.812rem] pb-[0.875rem] px-[1rem] rounded leading-[1.125rem] break-all',
              { 'bg-[#fff]': thumbSrc },
              { 'bg-[#faff00] ': !thumbSrc }
            )}
          >
            {message}
          </span>
        </span>
        <span className="min-w-[3.25rem] text-[0.75rem] leading-[0.875rem] text-[#fff] self-end pb-[0.0625rem]">
          {time}
        </span>
      </div>
    </div>
  );
};

export default ChatRow;
