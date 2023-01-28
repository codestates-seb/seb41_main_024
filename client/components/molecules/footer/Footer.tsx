import { ReactComponent as LogoFooter } from '../../../public/logos/logoFooter.svg';
import styles from './footer.module.css';
import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className={`flex flex-col bg-[#333] text-[#999] ${styles.center}`}>
      <LogoFooter className={styles.logo} />
      <p>© 2023 · All Rights Reserved</p>
      <p>Team : 나누조, Team Leader : 김형진</p>
      <p>BE developers : 최지현, 박지윤, 김연주</p>
      <p>FE developers : 송현우, 박경현, 김은수, 김형진</p>
      <p className="whitespace-pre">
        <span>Github :</span>
        <Link
          className={styles.color}
          href="https://github.com/codestates-seb/seb41_main_024"
        >
          https://github.com/codestates-seb/seb41_main_024
        </Link>
      </p>
    </footer>
  );
};
export default Footer;
