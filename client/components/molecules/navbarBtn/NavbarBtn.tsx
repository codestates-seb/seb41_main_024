import Link from 'next/link';
import Image from 'next/image';

// import HomeIcon from '../../../public/navbar/HomeIcon';
// import MapIcon from '../../../public/navbar/MapIcon';
// import ChatIcon from '../../../public/navbar/ChatIcon';
// import MypageIcon from '../../../public/navbar/MypageIcon';
// import NewIcon from '../../../public/navbar/NewIcon';

import HomeIcon from '../../../public/navbar/home.svg';
import MapIcon from '../../../public/navbar/map.svg';
import ChatIcon from '../../../public/navbar/chat.svg';
import MypageIcon from '../../../public/navbar/mypage.svg';
import NewIcon from '../../../public/navbar/new.svg';

interface navbarBtnPropsType {
  name: string;
  path: string;
  icon: string;
}

const NavbarBtn = ({ name, path, icon }: navbarBtnPropsType) => {
  const icons = {
    home: <HomeIcon />,
    map: <MapIcon />,
    chat: <ChatIcon />,
    mypage: <MypageIcon />,
    new: <NewIcon />,
  };

  return (
    <div className="flex-1">
      <Link href={path}>
        <div
          className={`${
            icon === 'new' ? 'bg-sky-500' : ''
          } flex flex-col justify-around items-center grow-1 p-2.5`}
        >
          {/* {icons['home']} */}
          {/* {icon === 'home' && <HomeIcon />}
          {icon === 'map' && <MapIcon />}
          {icon === 'chat' && <ChatIcon />}
          {icon === 'mypage' && <MypageIcon />}
          {icon === 'new' && <NewIcon />} */}
          {icon === 'home' && (
            <Image src="/navbar/home.svg" width={26} height={26} alt="홈" />
          )}
          {icon === 'map' && (
            <Image src="/navbar/map.svg" width={26} height={26} alt="내 근처" />
          )}
          {icon === 'chat' && (
            <Image src="/navbar/chat.svg" width={26} height={26} alt="채팅" />
          )}
          {icon === 'mypage' && (
            <Image
              src="/navbar/mypage.svg"
              width={26}
              height={26}
              alt="나의 N게더"
            />
          )}
          {icon === 'new' && (
            <Image
              src="/navbar/new.svg"
              width={26}
              height={26}
              alt="N게더 모집"
            />
          )}
          <span
            className={`${
              icon === 'new' ? 'text-white' : 'text-gray-600'
            }  m-1`}
          >
            {name}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarBtn;
