import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import AnswerWork from '../../tabPanel/admin/AnswerWork';
import ReportWork from '../../tabPanel/admin/ReportWork';

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
        <ReportWork />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <AnswerWork />
      </TabPanel>
    </>
  );
};

export default AdminTab;
