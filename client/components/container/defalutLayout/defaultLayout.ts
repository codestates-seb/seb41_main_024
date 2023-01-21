import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export interface defaultLayoutPropsType {
  children: ReactElement;
}
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
