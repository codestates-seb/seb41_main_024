import { ReactElement, useState } from 'react';
import LayoutWithFooter from '../../components/container/layoutWithFooter/LayoutWithFooter';
import BasicTabs from '../../components/molecules/tab/BasicTabs';
import TabPanel from '../../components/atoms/tabPanel/TabPanel';
import UserInfoEdit from '../../components/organisms/tabPanel/myPage/UserInfoEdit';
import MySharingTab from '../../components/organisms/tab/mySharingTab/MySharingTab';
import UserInquiry from '../../components/organisms/tabPanel/myPage/UserInquiry';

const TAB_LABEL = ['내정보', '쉐어링', '1:1 문의'];

const Mypage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    setCurrentTab(newCurrentTab);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-end h-[4.5rem] mb-10">
        <p className="text-xl">마이페이지</p>
      </div>

      <BasicTabs
        currentTab={currentTab}
        handleChange={handleChange}
        tabLabels={TAB_LABEL}
        centered={true}
      />
      <TabPanel currentTab={currentTab} index={0} boxPadding={0}>
        <UserInfoEdit />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1} boxPadding={0}>
        <MySharingTab />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={2} boxPadding={0}>
        <UserInquiry />
      </TabPanel>
    </div>
  );
};

Mypage.getLayout = function (page: ReactElement) {
  return <LayoutWithFooter>{page}</LayoutWithFooter>;
};

export default Mypage;
