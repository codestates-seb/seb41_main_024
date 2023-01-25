import { ButtonProps } from '@mui/material';

export interface formButtonType extends ButtonProps {
  content: string;
  variant: 'outlined' | 'contained';
  className?: string;
  type?: 'reset' | 'button' | 'submit';
  props?: ButtonProps;
}
