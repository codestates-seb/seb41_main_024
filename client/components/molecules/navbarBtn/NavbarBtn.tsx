import { Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import { navbarBtnPropsType } from './Type_navbarBtn';
import Link from 'next/link';

const NavbarBtn = ({
  name,
  path,
  iconSource,
  isNewBtn,
}: navbarBtnPropsType) => {
  return (
    <>
      <Link href={path}>
        <div
          className={`${
            isNewBtn ? 'bg-sky-500' : 'bg-sky-100'
          } flex flex-col justify-center items-center p-2.5 w-32`}
        >
          <img className="w-8 m-0.5" src={iconSource} />
          <p className={`${isNewBtn ? 'text-white' : 'text-gray-600'}  m-1`}>
            {name}
          </p>
        </div>
      </Link>
    </>
  );
};

export default NavbarBtn;
