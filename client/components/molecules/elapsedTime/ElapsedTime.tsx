import { SetStateAction, useEffect, useState } from 'react';
import { elapsedTimePropsType, timeType } from './elapsedTimeType';

const ElapsedTime = ({ createDate }: elapsedTimePropsType) => {
  const [elapsedTime, setElapsedTime] = useState('');
  useEffect(() => {
    function calculateElapsedTime() {
      const uploadTime: Date = new Date(createDate);
      const currentTime: Date = new Date();
      const timeDiff = (currentTime.valueOf() - uploadTime.valueOf()) / 1000;
      const times = [
        { time: '년', seconds: 60 * 60 * 24 * 365 },
        { time: '개월', seconds: 60 * 60 * 24 * 30 },
        { time: '일', seconds: 60 * 60 * 24 },
        { time: '시간', seconds: 60 * 60 },
        { time: '분', seconds: 60 },
      ];
      let formattedTimeDiff = '';
      for (let item of times) {
        if (timeDiff < item.seconds) {
          continue;
        } else {
          formattedTimeDiff =
            Math.floor(timeDiff / item.seconds) + `${item.time}전`;
          break;
        }
      }

      return formattedTimeDiff || '방금 전';
    }
    setElapsedTime(calculateElapsedTime());
  }, [createDate]);
  return <span>{elapsedTime || 'now'}</span>;
};

export default ElapsedTime;
