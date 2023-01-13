import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import SharingListItem from '../../../molecules/sharingListItem/SharingListItem';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import NearByList from '../../nearByList/NearByList';
const dummyLabel = [
  { label: '최신순', index: 0 },
  { label: '거리순', index: 1 },
];

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
        tabLabels={dummyLabel}
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
