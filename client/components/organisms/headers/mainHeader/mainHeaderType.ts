import { Session } from 'next-auth';

export interface mainHeaderType {
  isLogin: boolean;
  nickName: string | undefined;
  logOutHandler: () => void;
  session?:
    | {
        readonly data: null;
        readonly status: 'loading';
      }
    | {
        data: Session;
        status: 'authenticated';
      }
    | {
        data: null;
        status: 'loading' | 'unauthenticated';
      }
    | {
        data: Session;
        status: 'authenticated';
      };
}
