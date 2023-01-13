import { StaticImageData } from 'next/image';

export interface buttonPropsType {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}
