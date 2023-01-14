import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { tabPanelPropsType } from './tabPanel';
function TabPanel(props: tabPanelPropsType) {
  const { children, value, index, boxPadding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: boxPadding || 2 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default TabPanel;