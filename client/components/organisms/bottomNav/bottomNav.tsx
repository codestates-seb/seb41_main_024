import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(2); // 버튼 넘버

  const router = useRouter();
  console.log(router);

  const paths: string[] = ['/home', '/map', '/chatlist', 'mypage', '/new'];

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={4}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            // router.push(paths[newValue]);
          }}
          sx={{
            height: 70,
          }}
        >
          <BottomNavigationAction label="홈" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction
            label="내 주변"
            icon={<LocationOnOutlinedIcon />}
          />
          <BottomNavigationAction
            label="채팅"
            icon={<ChatBubbleOutlineOutlinedIcon />}
          />
          <BottomNavigationAction
            label="나의 N게더"
            icon={<PersonOutlineOutlinedIcon />}
          />

          <BottomNavigationAction
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.light,
              '& .Mui-selected, svg': {
                color: (theme) => theme.palette.primary.light,
              },
            }}
            label="N게더 모집"
            icon={<AddOutlinedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

interface ProductExample {
  id: number;
  thumbnail: string | undefined;
  isOpen: boolean;
  title: string;
  price: string;
  spot: string;
}

// const productList: readonly ProductExample[] = [
//   {
//     id: 1,
//     thumbnail: '',
//     isOpen: true,
//     title: '아삭아삭 나주배 3kg',
//     price: '9,850',
//     spot: '서울 서초구',
//   },
//   {
//     id: 2,
//     thumbnail: '',
//     isOpen: true,
//     title: '남해안 디포리 멸치다시팩 15g * 20팩',
//     price: '9,850',
//     spot: '경기도 수지구',
//   },
//   {
//     id: 3,
//     thumbnail: '',
//     isOpen: false,
//     title: '23년 햅쌀 프리미엄 경기미  쌀 10kg',
//     price: '9,850',
//     spot: '제주 연동',
//   },
//   {
//     id: 4,
//     thumbnail: '',
//     isOpen: true,
//     title: '호주산 냉장 소고기 모듬구이 세트 600',
//     price: '9,850',
//     spot: '서울 서초구',
//   },
//   {
//     id: 5,
//     thumbnail: '',
//     isOpen: false,
//     title: '헤이즈 파스텔 확장형 캐리어',
//     price: '9,850',
//     spot: '서울 서초구',
//   },
//   {
//     id: 6,
//     thumbnail: '',
//     isOpen: false,
//     title: '프라우반 독일산 젤락스 Welfare-Relax 베개/베개커버',
//     price: '15,120',
//     spot: '서울 서초구',
//   },
//   {
//     id: 7,
//     thumbnail: '',
//     isOpen: true,
//     title: '송이송송 자연한톨 코인육수/자연톡톡 분말육수',
//     price: '32,850',
//     spot: '서울 서초구',
//   },
//   {
//     id: 8,
//     thumbnail: '',
//     isOpen: true,
//     title: '[명절명작]견과 선물세트 13호',
//     price: '4,850',
//     spot: '서울 서초구',
//   },
//   {
//     id: 9,
//     thumbnail: '',
//     isOpen: false,
//     title: '광동 초임계 알티지 오메가3 맥스',
//     price: '19,850',
//     spot: '서울 서초구',
//   },
//   {
//     id: 10,
//     thumbnail: '',
//     isOpen: true,
//     title: '[산들목장] 1+한우선물세트',
//     price: '87,850',
//     spot: '서울 서초구',
//   },
// ];
