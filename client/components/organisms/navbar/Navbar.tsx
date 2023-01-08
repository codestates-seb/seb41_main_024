import { Fragment } from 'react';
import NavbarBtn from '../../molecules/navbarBtn/NavbarBtn';
import homeIcon from '../../../src/assets/navbar/home.svg';
import mapIcon from '../../../src/assets/navbar/map.svg';
import chatIcon from '../../../src/assets/navbar/chat.svg';
import mypageIcon from '../../../src/assets/navbar/mypage.svg';
import newIcon from '../../../src/assets/navbar/new.svg';

const Navbar = () => {
  return (
    <div className="flex justify-center items-center w-fit border-solid border-0 border-t border-slate-400">
      <NavbarBtn name="홈" path="/" iconSource={homeIcon} isNewBtn={false} />
      <NavbarBtn
        name="내 근처"
        path="/detail"
        iconSource={mapIcon}
        isNewBtn={false}
      />
      <NavbarBtn
        name="채팅"
        path="/chat"
        iconSource={chatIcon}
        isNewBtn={false}
      />
      <NavbarBtn
        name="나의 N게더"
        path="/mypage"
        iconSource={mypageIcon}
        isNewBtn={false}
      />
      <NavbarBtn name="N게더 모집" path="/new" iconSource={newIcon} isNewBtn />
    </div>
  );
};

export default Navbar;
