import { ReactElement, useState } from 'react';
import LayoutWithFooter from '../../components/container/layoutWithFooter/LayoutWithFooter';
import UserInfoEdit from '../../components/organisms/tabPanel/myPage/UserInfoEdit';
import MySharingTab from '../../components/organisms/tab/mySharingTab/MySharingTab';
import UserInquiry from '../../components/organisms/tabPanel/myPage/UserInquiry';
import NTabs from '../../components/organisms/nTabs/NTabs';

const Mypage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-end h-[4.5rem] mb-10">
        <p className="text-xl">마이페이지</p>
      </div>

      <NTabs
        ariaLabel="내 서비스 탭"
        tabLabels={['내정보', '쉐어링', '1:1문의']}
      >
        <UserInfoEdit />
        <MySharingTab />
        <UserInquiry />
      </NTabs>
    </div>
  );
};

Mypage.getLayout = function (page: ReactElement) {
  return <LayoutWithFooter>{page}</LayoutWithFooter>;
};

export default Mypage;
