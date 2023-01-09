import NavbarBtn from '../../molecules/navbarBtn/NavbarBtn';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-screen border-solid border-0 border-t border-slate-400">
      <NavbarBtn name="홈" path="/" isHomeBtn />
      <NavbarBtn name="내 근처" path="/detail" isMapBtn />
      <NavbarBtn name="채팅" path="/chat" isChatBtn />
      <NavbarBtn name="나의 N게더" path="/mypage" isMypageBtn />
      <NavbarBtn name="N게더 모집" path="/new" isNewBtn />
    </div>
  );
};

export default Navbar;
