import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { TabPanelPropsType } from './Type_TabPanel';
function TabPanel({
  children,
  value,
  index,
  boxPadding = 2,
  ...other
}: TabPanelPropsType) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: boxPadding }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default TabPanel;
