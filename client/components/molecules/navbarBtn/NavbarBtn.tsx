import Link from 'next/link';
import Image from 'next/image';

import HomeIcon from '../../../public/navbar/HomeIcon';
import MapIcon from '../../../public/navbar/MapIcon';
import ChatIcon from '../../../public/navbar/ChatIcon';
import MypageIcon from '../../../public/navbar/MypageIcon';
import NewIcon from '../../../public/navbar/NewIcon';

interface navbarBtnPropsType {
  name: string;
  path: string;
  isHomeBtn?: boolean;
  isMapBtn?: boolean;
  isChatBtn?: boolean;
  isMypageBtn?: boolean;
  isNewBtn?: boolean;
}

const NavbarBtn = ({
  name,
  path,
  isHomeBtn,
  isMapBtn,
  isChatBtn,
  isMypageBtn,
  isNewBtn,
}: navbarBtnPropsType) => {
  return (
    <div className="flex-1">
      <Link href={path}>
        <div
          className={`${
            isNewBtn ? 'bg-sky-500' : 'bg-sky-100'
          } flex flex-col justify-around items-center grow-1 p-2.5`}
        >
          {/* {isHomeBtn && (
            <Image src="/navbar/home.svg" width={26} height={26} alt="홈" />
          )}
          {isMapBtn && (
            <Image src="/navbar/map.svg" width={26} height={26} alt="내 근처" />
          )}
          {isChatBtn && (
            <Image src="/navbar/chat.svg" width={26} height={26} alt="채팅" />
          )}
          {isMypageBtn && (
            <Image
              src="/navbar/mypage.svg"
              width={26}
              height={26}
              alt="나의 N게더"
            />
          )}
          {isNewBtn && (
            <Image
              src="/navbar/new.svg"
              width={26}
              height={26}
              alt="N게더 모집"
            />
          )} */}
          {isHomeBtn && <HomeIcon />}
          {isMapBtn && <MapIcon />}
          {isChatBtn && <ChatIcon />}
          {isMypageBtn && <MypageIcon />}
          {isNewBtn && <NewIcon />}
          <span className={`${isNewBtn ? 'text-white' : 'text-gray-600'}  m-1`}>
            {name}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarBtn;
