import { SetStateAction, useEffect, useState } from 'react';
import { elapsedTimeProps, timeType } from './elapsedTime';

const ElapsedTime = ({ createdAt }: elapsedTimeProps) => {
  const [elapsedTime, setElapsedTime] = useState('');
  useEffect(() => {
    function calculateElapsedTime() {
      const uploadTime: Date = new Date(createdAt);
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
        if (item.time === '분') {
          formattedTimeDiff =
            Math.floor(timeDiff / item.seconds) + `${item.time}전`;
        }
        if (timeDiff / item.seconds < 1) {
          continue;
        } else {
          formattedTimeDiff =
            Math.floor(timeDiff / item.seconds) + `${item.time}전`;
          break;
        }
      }

      return formattedTimeDiff;
    }
    setElapsedTime(calculateElapsedTime());
  }, []);
  return <span>{elapsedTime || 'now'}</span>;
};

export default ElapsedTime;
