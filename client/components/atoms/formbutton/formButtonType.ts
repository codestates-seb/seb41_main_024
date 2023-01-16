import React from 'react';

export interface formButtonType {
  content: string;
  variant: 'outlined' | 'contained';
  className?: string;
  type?: 'submit'
}