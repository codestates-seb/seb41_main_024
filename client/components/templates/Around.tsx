import React from 'react';
import MainHeader from '../organisms/headers/mainHeader/MainHeader';
import { ReactComponent as Map } from '../../public/sharingList/map.svg';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import styles from './around.module.css';
import AroundList from '../organisms/aroundList/AroundList';
import Navbar from '../organisms/navbar/Navbar';
const Around = (props) => {
  return (
    <div className="flex flex-col items-center">
      <MainHeader />
      <div className="mx-auto">
        <Map className={styles.image} />
      </div>
      <MenuOutlinedIcon />
      <AroundList />
      <Navbar />
    </div>
  );
};

export default Around;
