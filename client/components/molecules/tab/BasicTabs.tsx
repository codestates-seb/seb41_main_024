import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import SharingListItem from '../sharingListItem/SharingListItem';
import TabPanel from '../../atoms/tab/TabPanel';
import { BasicTabsPropsType } from './Type_Tab';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ handleChange, value }: BasicTabsPropsType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          bgcolor: '#63A8DA',
          color: 'white',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { background: '#fff' } }}
          textColor="inherit"
          centered
          sx={{
            borderBottom: 1,
            borderColor: 'primary.contrastText',
          }}
        >
          <Tab label="내정보" {...a11yProps(0)} />
          <Tab label="쉐어링" {...a11yProps(1)} />
          <Tab label="1:1 문의" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}
