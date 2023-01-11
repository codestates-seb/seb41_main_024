import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import BottomNav from '../../components/organisms/bottomNav/bottomNav';
import Footer from '../../components/molecules/footer/Footer';
import Slogan from '../../components/molecules/slogan/Slogan';
import Input from '../../components/atoms/input/Input';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { useState, useEffect } from 'react';

const ChatList = () => {
  const [chatListData, setChatListData] = useState([] as any);

  interface ChatListResponse {
    id: Number;
    thumbnail: string;
    isOpen: false;
    title: string;
    price: string;
    spot: string;
  }

  return (
    <div>
      <MainHeader />
      <div className="mt-28">
        <Slogan />
      </div>
      <div className="p-12 pb-20">
        <Stack spacing={2}>
          <Input
            id={''}
            label="우리 동네 N게더를 검색해보세요"
            selectProps={{
              native: false,
            }}
            rows={0}
            multiline={false}
            className="w-full"
          />
          <Button variant="contained" fullWidth>
            <SearchOutlinedIcon />
            위치 검색
          </Button>
          <Button variant="outlined" fullWidth>
            <SearchOutlinedIcon />내 위치로 검색
          </Button>
        </Stack>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default ChatList;
