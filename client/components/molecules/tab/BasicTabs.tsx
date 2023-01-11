import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';

import SharingListItem from '../sharingListItem/SharingListItem';
import TabPanel from '../../atoms/tabPanel/TabPanel';
import { BasicTabsPropsType } from './Type_BasicTabs';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  handleChange,
  value,
  bgcolor,
  color,
}: BasicTabsPropsType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          // bgcolor: '#63A8DA',
          // color: 'white',
          bgcolor,
          color,
          borderBottom: 1,
          borderColor: 'divdider',
          height: 47,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // TabIndicatorProps={{ style: { background: '#fff' } }}
          TabIndicatorProps={{
            style: { background: '#63A8DA', height: '3px' },
          }}
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
