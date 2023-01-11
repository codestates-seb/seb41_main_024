import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import SharingListItem from '../../../molecules/sharingListItem/SharingListItem';
import BasicTabs from '../../../molecules/tab/BasicTabs';
const dummyLabel = [
  { label: '최신순', index: 0 },
  { label: '거리순', index: 1 },
];

const AroundPageTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <BasicTabs
        value={value}
        handleChange={handleChange}
        tabLabels={dummyLabel}
        centered={false}
      />
      <TabPanel value={value} index={0}>
        <SharingListItem
          title="test"
          src="/sharingList/pepsi.svg"
          isHeart={true}
          alt="pepsi"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>{' '}
    </>
  );
};

export default AroundPageTab;
