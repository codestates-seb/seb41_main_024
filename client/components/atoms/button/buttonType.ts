import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface buttonType
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}
