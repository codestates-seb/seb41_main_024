import React from 'react';
import { alertPropsType } from './alert';

const Alert = ({ alertNum }: alertPropsType) => {
  return (
    <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary mb-2">
      <p className="text-xs text-center text-white">{alertNum}</p>
    </div>
  );
};

export default Alert;
