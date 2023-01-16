import React from 'react';

export interface formButtonType extends React.ComponentProps<'button'> {
  content: string;
  variant: 'outlined' | 'contained';
  className?: string;
}