import { ReactComponent as LogoFooter } from '../../../public/logos/logoFooter.svg';
import styles from './footer.module.css';
import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className={`flex flex-col bg-[#333] text-[#999] ${styles.center}`}>
      <LogoFooter className={styles.logo} />
      <span>© 2023 · All Rights Reserved</span>
      <span>Team : 나누조, Team Leader : 김형진</span>
      <span>BE developers : 최지현, 박지윤, 김연주</span>
      <span>FE developers : 송현우, 박경현, 김은수, 김형진</span>
      <span className='text-center'>
        <span>Github :</span>
        <Link
          className={styles.color + " break-all"}
          href="https://github.com/codestates-seb/seb41_main_024"
        >
          https://github.com/codestates-seb/seb41_main_024
        </Link>
      </span>
    </footer>
  );
};
export default Footer;
