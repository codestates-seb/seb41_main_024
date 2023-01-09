import Link from 'next/link';

import HomeIcon from '../../../src/assets/navbar/HomeIcon';
import MapIcon from '../../../src/assets/navbar/MapIcon';
import ChatIcon from '../../../src/assets/navbar/ChatIcon';
import MypageIcon from '../../../src/assets/navbar/MypageIcon';
import NewIcon from '../../../src/assets/navbar/NewIcon';

interface navbarBtnPropsType {
  // children: JSX.Element;
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
    <>
      <Link href={path}>
        <div
          className={`${
            isNewBtn ? 'bg-sky-500' : 'bg-sky-100'
          } flex flex-col justify-center items-center p-2.5 w-60`}
        >
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
    </>
  );
};

export default NavbarBtn;
