import React from 'react';
import { ReactComponent as Logo } from '../../../public/logos/logoRow.svg';
import styles from './slogan.module.css';

const Slogan = () => {
  return (
    <div className={`flex flex-col ${styles.container}`}>
      <Logo />
      <p className="pt-px mt-4">
        <strong className={styles.emphasize}>필요</strong>한 만큼만,{' '}
        <strong className={styles.emphasize}>구매</strong>의 새로운 방법
      </p>
      <p className="pb-px">
        Find your <strong className={styles.emphasize}>shopping mate</strong>
      </p>
    </div>
  );
};

export default Slogan;
