import { ReactElement } from 'react';
import LayoutWithFooter from '../../components/container/layoutWithFooter/LayoutWithFooter';
import UserInfoEdit from '../../components/container/userInfoEdit/UserInfoEdit';
import MyAllSharing from '../../components/container/myAllSharing/MyAllSharing';
import NTabs from '../../components/organisms/nTabs/NTabs';
import MyInquiry from '../../components/container/myInquiry/MyInquiry';
import LoginChecker from '../../components/container/loginChecker/LoginChecker';
import Head from 'next/head';

const Mypage = () => {
  return (
    <LoginChecker path="/login">
      <Head>
        <title>내정보</title>
        <meta
          name="description"
          content="내 정보 수정, 주소록 등록, 찜한 쉐어링, 참여한 쉐어링, 내가 개설한 쉐어링, 1:1 문의 등 다양한 서비스가 준비되어 있는 페이지입니다."
        />
      </Head>
      <div className="flex flex-col">
        <div className="flex justify-center items-end h-[4.5rem] mb-10">
          <p className="text-xl">마이페이지</p>
        </div>
        <NTabs
          ariaLabel="내 서비스 탭"
          tabLabels={['내정보', '쉐어링', '1:1문의']}
        >
          <UserInfoEdit />
          <MyAllSharing />
          <MyInquiry />
        </NTabs>
      </div>
    </LoginChecker>
  );
};

Mypage.getLayout = function (page: ReactElement) {
  return <LayoutWithFooter>{page}</LayoutWithFooter>;
};

export default Mypage;
