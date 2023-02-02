import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { tabPanelType } from './tabPanelType';
function TabPanel({
  children,
  currentTab,
  index,
  boxPadding = 2,
  className,
  ...other
}: tabPanelType) {
  return (
    <div
      className={className}
      role="tabpanel"
      hidden={currentTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {currentTab === index && (
        <Box sx={{ p: boxPadding }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default TabPanel;
