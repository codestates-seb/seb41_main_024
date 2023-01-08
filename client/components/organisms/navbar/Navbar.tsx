import { Fragment } from 'react';
import NavbarBtn from '../../molecules/navbarBtn/NavbarBtn';
import Home from '../../../public/navbar/home.svg';

const Navbar = () => {
  return (
    <div className="flex justify-center items-center w-fit border-solid border-0 border-t border-slate-400">
      <Home />
      <NavbarBtn
        name="홈"
        path="/"
        iconSource="/navbar/home.svg"
        isNewBtn={false}
      />
      <NavbarBtn
        name="내 근처"
        path="/detail"
        iconSource="/navbar/map.svg"
        isNewBtn={false}
      />
      <NavbarBtn
        name="채팅"
        path="/chat"
        iconSource="/navbar/chat.svg"
        isNewBtn={false}
      />
      <NavbarBtn
        name="나의 N게더"
        path="/mypage"
        iconSource="/navbar/mypage.svg"
        isNewBtn={false}
      />
      <NavbarBtn
        name="N게더 모집"
        path="/new"
        iconSource="/navbar/new.svg"
        isNewBtn
      />
    </div>
  );
};

export default Navbar;
