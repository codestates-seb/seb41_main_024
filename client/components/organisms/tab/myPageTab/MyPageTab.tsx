import React from 'react';
import TabPanel from '../../../atoms/tabPanel/TabPanel';
import SharingListItem from '../../../molecules/sharingListItem/SharingListItem';
import BasicTabs from '../../../molecules/tab/BasicTabs';
const dummyLabel = [
  { label: '내정보', index: 0 },
  { label: '쉐어링', index: 1 },
  { label: '1:1 문의', index: 2 },
];

const MyPageTab = () => {
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
        centered={true}
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

export default MyPageTab;