import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { nTabsType } from './nTabsType';
import classnames from 'classnames';

const NTabs = ({
  children,
  ariaLabel = 'simple-tap',
  tabLabels,
  centered = true,
  handleClick,
  PannelPadding = 0,
  themeSub = false,
}: nTabsType) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
    setCurrentTab(newCurrentTab);
  };

  return (
    <>
      <Box className="w-full">
        <Box
          className={classnames(
            'border-0 border-b border-[#333] border-solid h-[2.9375rem]',
            { 'border-[#333]': !themeSub },
            { 'border-[#999] bg-[#FAF9F9] text-[#777]': themeSub }
          )}
        >
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label={ariaLabel}
            TabIndicatorProps={{
              style: { background: '#63A8DA', height: '3px' },
            }}
            textColor="inherit"
            sx={{
              borderBottom: 1,
              borderColor: 'primary.contrastText',
            }}
            {...(centered ? { centered: true } : null)}
          >
            {tabLabels?.map((tabLabel, index) => (
              <Tab
                label={tabLabel}
                key={index}
                id={`nTab_${index}`}
                aria-controls={`nTab_pannel_${index}`}
                onClick={handleClick}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {React.Children.map(children, (child, index) => (
        <div
          role="tabpanel"
          hidden={currentTab !== index}
          id={`nTab_pannel_${index}`}
          aria-labelledby={`nTab_${index}`}
        >
          {currentTab === index && (
            <Box sx={{ p: PannelPadding }}>
              <Typography component="div">{child}</Typography>
            </Box>
          )}
        </div>
      ))}
    </>
  );
};

export default NTabs;
