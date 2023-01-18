import Badge from '../../atoms/badge/Badge';
import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';
import styles from './chatItem.module.css';
import { chatItemPropsType } from './chatItem';

const ChatItemWithAlert = ({
  thumbnail,
  isOpen,
  title,
  price,
  spot,
  alertNum,
}: chatItemPropsType) => {
  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <Badge isOpen={isOpen} />
        <p className={`${styles.title_ellipsis} text-s font-medium`}>{title}</p>
        <p className="text-xs text-primary font-medium">인당 {price}원</p>
      </div>
      <div className="flex flex-col items-end h-max">
        <SmallSpot spot={spot} />
        {Number(alertNum) > 0 && <Alert alertNum={alertNum} />}
      </div>
    </div>
  );
};

export default ChatItemWithAlert;
