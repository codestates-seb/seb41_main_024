import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface buttonPropsType
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}
