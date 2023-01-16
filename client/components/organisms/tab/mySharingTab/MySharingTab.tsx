import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import NearByList from '../../nearByList/NearByList';
const LABEL = ['개설한 쉐어링', '참여한 쉐어링', '찜한 쉐어링'];

const MySharingTab = () => {
  const [currentTab, seCurrentTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    seCurrentTab(newCurrentTab);
  };
  return (
    <section>
      <BasicTabs
        currentTab={currentTab}
        handleChange={handleChange}
        tabLabels={LABEL}
        centered={true}
        bgcolor="#FAF9F9"
        color="#999999"
      />
      <TabPanel currentTab={currentTab} index={0} boxPadding={2}>
        <NearByList />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1} boxPadding={2}>
        <NearByList />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={2} boxPadding={2}>
        <NearByList />
      </TabPanel>{' '}
    </section>
  );
};

export default MySharingTab;
