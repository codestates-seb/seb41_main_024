import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import NearByList from '../../nearByList/NearByList';
const LABEL = ['최신순', '거리순'];

const NearByPageTab = () => {
  const [currentTab, seCurrentTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    seCurrentTab(newCurrentTab);
  };
  return (
    <>
      <BasicTabs
        currentTab={currentTab}
        handleChange={handleChange}
        tabLabels={LABEL}
        centered={false}
      />
      <TabPanel currentTab={currentTab} index={0}>
        <NearByList />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <NearByList />
      </TabPanel>
    </>
  );
};

export default NearByPageTab;
