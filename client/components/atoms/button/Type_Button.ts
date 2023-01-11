import { StaticImageData } from 'next/image';
import React from 'react';

export interface ButtonPropsType {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}
