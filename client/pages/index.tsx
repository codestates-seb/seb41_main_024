import { Button } from '@mui/material';
import { Fragment } from 'react';
import ChatHeader from '../components/organism/headers/chatHedaer/ChatHeader';
import MainHeader from '../components/organism/headers/mainHeader/MainHeader';

export default function Home() {
  return (
    <Fragment>
      <ChatHeader />
      <MainHeader />
      <Button>테스트</Button>
      <h1 className="text-3xl font-bold underline">Hello world</h1>
    </Fragment>
  );
}
