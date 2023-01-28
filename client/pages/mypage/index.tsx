import { ReactElement } from 'react';
import LayoutWithFooter from '../../components/container/layoutWithFooter/LayoutWithFooter';
import UserInfoEdit from '../../components/container/userInfoEdit/UserInfoEdit';
import MyAllSharing from '../../components/container/myAllSharing/MyAllSharing';
import NTabs from '../../components/organisms/nTabs/NTabs';
import MyInquiry from '../../components/container/myInquiry/MyInquiry';
import LoginChecker from '../../components/container/loginChecker/LoginChecker';

const Mypage = () => {
  return (
    <LoginChecker path="/login">
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
