import React from 'react';
import Img from '../../components/atoms/image/Image';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';

const Index = () => {
  return (
    <div>
      <MainHeader />
      <Img src="/detail/straw.svg" alt="메인사진" />
      <UserMetaInfo />
      <PostMeta />
      <DetailPageTab />
      <DetailBottom />
    </div>
  );
};

export default Index;
