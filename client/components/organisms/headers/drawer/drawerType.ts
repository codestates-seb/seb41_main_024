import { ReactNode } from 'react';

export interface drawerType {
  children: ReactNode;
  isOpen: boolean;
  onClick: any;
  userInfo?: object;
}
