import { MouseEventHandler } from 'react';

export default interface randomProfileType {
  profileUrl: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
