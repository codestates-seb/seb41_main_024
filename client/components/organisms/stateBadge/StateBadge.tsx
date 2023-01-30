import classnames from 'classnames';
import { stateBadgeType } from './stateBadgeType';

const StateBadge = ({ stateText, usedDetail, usedList }: stateBadgeType) => {
  return (
    <span className="absolute inset-0 z-[1] bg-black bg-opacity-[0.4]">
      <span className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-[54%] pb-[54%] bg-black bg-opacity-[0.8] rounded-full">
        <span
          className={classnames(
            `absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] text-white whitespace-nowrap`,
            { 'text-[5.6vw] pcScreenWidth:text-[37px]': usedDetail },
            { 'text-[3.3vw] pcScreenWidth:text-[22px]': usedList }
          )}
        >
          {stateText}
        </span>
      </span>
    </span>
  );
};

export default StateBadge;
