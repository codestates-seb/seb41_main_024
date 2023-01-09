import { Fragment } from "react";
import NavbarBtn from "../../molecules/navbarBtn/NavbarBtn";
import Home from "../../../public/navbar/home.svg";
import homeIcon from "../../../src/assets/home.svg";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center w-fit border-solid border-0 border-t border-slate-400">
      <NavbarBtn name="홈" path="/" iconSource={homeIcon} isNewBtn={false} />
    </div>
  );
};

export default Navbar;
