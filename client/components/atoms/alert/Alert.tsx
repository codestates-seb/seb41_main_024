import React from 'react';
import { alertType } from './alertType';
import Badge from '@mui/material/Badge';

const Alert = ({ unreadCount }: alertType) => {
  return (
    <div className="flex justify-center items-center w-6 h-6">
      <Badge badgeContent={unreadCount} color="primary"></Badge>
    </div>
  );
};

export default Alert;
