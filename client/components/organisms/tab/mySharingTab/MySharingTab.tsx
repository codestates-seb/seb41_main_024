import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import NearByList from '../../nearByList/NearByList';
const dummyLabel = [
  { label: '개설한 쉐어링', index: 0 },
  { label: '참여한 쉐어링', index: 1 },
  { label: '찜한 쉐어링', index: 2 },
];

const MySharingTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <section>
      <BasicTabs
        value={value}
        handleChange={handleChange}
        tabLabels={dummyLabel}
        centered={true}
        bgcolor="#FAF9F9"
        color="#999999"
      />
      <TabPanel value={value} index={0} boxPadding={2}>
        <NearByList />
      </TabPanel>
      <TabPanel value={value} index={1} boxPadding={2}>
        <NearByList />
      </TabPanel>
      <TabPanel value={value} index={2} boxPadding={2}>
        <NearByList />
      </TabPanel>{' '}
    </section>
  );
};

export default MySharingTab;
