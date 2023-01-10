import styles from './footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <div
      className={`flex flex-col ${styles.bg_footer} ${styles.color_footer} ${styles.center_footer}`}
    >
      <p>© 2023 · All Rights Reserved</p>
      <p>Team : 나누조, Team Leader : 김형진</p>
      <p>BE developers : 최지현, 박지윤, 김연주</p>
      <p>FE developers : 송현우, 박경현, 김은수, 김형진</p>
      <p>
        Github :
        <Link
          className={styles.color_footer}
          href="https://github.com/codestates-seb/seb41_main_024"
        >
          https://github.com/codestates-seb/seb41_main_024
        </Link>
      </p>
    </div>
  );
};

export default Footer;
