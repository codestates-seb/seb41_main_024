import Image from 'next/image';
import React from 'react';
import styles from './image.module.css';

import { imageType } from './imageType';

const Img = ({ src, alt }: imageType) => {
  return (
    <div className={`relative ${styles.imgContainer}`}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default Img;
