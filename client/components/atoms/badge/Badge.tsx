import React from 'react';
import { badgeType } from './badgeType';

const Badge = ({ declareStatus }: badgeType) => {
  return (
    <>
      {!declareStatus && (
        <div className="flex justify-center items-center w-16 h-6 rounded-md bg-primary">
          <span className="text-xs text-white">모집 중</span>
        </div>
      )}
      {declareStatus && (
        <div className="flex justify-center items-center w-16 h-6 rounded-md bg-slate-400">
          <span className="text-xs text-white">모집 완료</span>
        </div>
      )}
    </>
  );
};

export default Badge;
