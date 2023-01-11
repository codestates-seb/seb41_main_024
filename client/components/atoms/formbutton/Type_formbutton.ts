import { MouseEventHandler } from 'react';

export interface FormButtonProps {
  content: string;
  variant: "outlined" | "contained";
  className?: string;
  onClick?: any;
}