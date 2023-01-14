import React from 'react';

export interface formButtonPropsType extends React.ComponentProps<'button'> {
  content: string;
  variant: 'outlined' | 'contained';
  className?: string;
}