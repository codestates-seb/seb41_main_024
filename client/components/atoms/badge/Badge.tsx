import React from 'react';
import { badgeType } from './badgeType';

const Badge = ({ recruitment }: badgeType) => {
  return (
    <>
      {!recruitment && (
        <div className="flex justify-center items-center w-16 h-6 rounded-md bg-primary">
          <span className="text-xs text-white">모집 중</span>
        </div>
      )}
      {recruitment && (
        <div className="flex justify-center items-center w-16 h-6 rounded-md bg-slate-400">
          <span className="text-xs text-white">모집 확정</span>
        </div>
      )}
    </>
  );
};

export default Badge;
