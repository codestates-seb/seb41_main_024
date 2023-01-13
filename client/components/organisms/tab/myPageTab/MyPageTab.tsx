import React from 'react';
import UserInfoEdit from '../../tabPanel/myPage/UserInfoEdit';
import UserInquiry from '../../tabPanel/myPage/UserInquiry';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import MySharingTab from '../mySharingTab/MySharingTab';
const dummyLabel = [
  { label: '내정보', index: 0 },
  { label: '쉐어링', index: 1 },
  { label: '1:1 문의', index: 2 },
];

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
        tabLabels={dummyLabel}
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
