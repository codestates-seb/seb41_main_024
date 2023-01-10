import Image from 'next/image';
import React from 'react';
import styles from './image.module.css';

import { imagePropsType } from './Type_Image';

const Img = ({ src, alt }: imagePropsType) => {
  return (
    <div className={`relative ${styles.imgContainer}`}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default Img;
