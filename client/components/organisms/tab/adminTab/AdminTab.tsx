import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
const LABEL = ['신고 처리', '1:1 문의'];

const AdminTab = () => {
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
        
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        
      </TabPanel>
    </>
  );
};

export default AdminTab;
