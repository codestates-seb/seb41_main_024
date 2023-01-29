import React from 'react';
import { alertType } from './alertType';

const Alert = ({ alertNum }: alertType) => {
  return (
    <div className="flex justify-center items-center w-6 h-6 rounded-full bg-[#f7310e] mb-2">
      <p className="text-xs text-center text-white">{alertNum}</p>
    </div>
  );
};

export default Alert;
