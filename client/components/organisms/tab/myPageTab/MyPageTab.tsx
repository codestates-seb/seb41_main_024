import React from 'react';
import UserInfoEdit from '../../tabPanel/myPage/UserInfoEdit';
import UserInquiry from '../../tabPanel/myPage/UserInquiry';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import MySharingTab from '../mySharingTab/MySharingTab';
const LABEL = ['내정보', '쉐어링', '1:1 문의'];

const MyPageTab = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    setCurrentTab(newCurrentTab);
  };
  return (
    <>
      <BasicTabs
        currentTab={currentTab}
        handleChange={handleChange}
        tabLabels={LABEL}
        centered={true}
      />
      <TabPanel currentTab={currentTab} index={0}>
        <UserInfoEdit />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1} boxPadding={'0'}>
        <MySharingTab />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={2}>
        <UserInquiry />
      </TabPanel>{' '}
    </>
  );
};

export default MyPageTab;
