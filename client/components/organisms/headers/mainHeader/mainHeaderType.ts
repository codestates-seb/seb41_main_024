import { Session } from 'next-auth';

export interface mainHeaderType {
  isLogin: boolean;
  nickName: string | undefined;
  logOutHandler: () => void;
  session?: any;
}
