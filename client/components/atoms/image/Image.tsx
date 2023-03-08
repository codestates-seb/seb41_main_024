import Image from 'next/image';
import React from 'react';
import styles from './image.module.css';

import { imageType } from './imageType';

const Img = ({ src, alt }: imageType) => {
  return (
    <div className="relative pb-[70%] truncate h-auto">
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default Img;
