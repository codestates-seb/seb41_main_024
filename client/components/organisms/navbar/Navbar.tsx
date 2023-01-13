import NavbarBtn from '../../molecules/navbarBtn/NavbarBtn';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-screen border-solid border-0 border-t border-slate-400">
      <NavbarBtn name="홈" path="/" icon="home" />
      <NavbarBtn name="내 근처" path="/nearby" icon="map" />
      <NavbarBtn name="채팅" path="/chat" icon="chat" />
      <NavbarBtn name="나의 N게더" path="/mypage" icon="mypage" />
      <NavbarBtn name="N게더 모집" path="/new" icon="new" />
    </div>
  );
};

export default Navbar;
