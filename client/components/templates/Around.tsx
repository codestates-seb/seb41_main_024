import React from 'react';
import MainHeader from '../organisms/headers/mainHeader/MainHeader';
import { ReactComponent as Map } from '../../public/sharingList/map.svg';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import styles from './around.module.css';
import AroundList from '../organisms/aroundList/AroundList';
import Navbar from '../organisms/navbar/Navbar';
import Img from '../atoms/image/Image';
const Around = (props) => {
  return (
    <div className="flex flex-col items-center">
      <MainHeader />
      <div className="mx-auto w-full h-fit">
        <Img src="/sharingList/map.svg" alt="지도" />
      </div>
      <MenuOutlinedIcon />
      <AroundList />
      <Navbar />
    </div>
  );
};

export default Around;
