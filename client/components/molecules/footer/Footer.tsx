import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer
      className="flex flex-col bg-[#333] text-[#999] items-center justify-center
    pt-[35px] pr-[10px] pb-[45px] pl-[10px] self-end mt-auto w-[100%]"
    >
      <Image
        src="logos/logoFooter.svg"
        className="mb-[12px]"
        width="81"
        height="17"
        alt="로고"
      />
      <span>© 2023 · All Rights Reserved</span>
      <span>Team : 나누조, Team Leader : 김형진</span>
      <span>BE developers : 최지현, 박지윤, 김연주</span>
      <span>FE developers : 송현우, 박경현, 김은수, 김형진</span>
      <span className="text-center">
        <span>Github :</span>
        <Link
          className="break-all text-[#999999]"
          href="https://github.com/codestates-seb/seb41_main_024"
        >
          https://github.com/codestates-seb/seb41_main_024
        </Link>
      </span>
    </footer>
  );
};
export default Footer;
