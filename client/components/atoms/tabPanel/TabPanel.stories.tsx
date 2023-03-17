import React from 'react';
import { Meta, Story } from '@storybook/react';
import TabPanel from './TabPanel';
import { tabPanelType } from './tabPanelType';

export default {
  title: 'TabPanel',
  component: TabPanel,
  argTypes: {
    currentTab: { control: { type: 'number' } },
    index: { control: { type: 'number' } },
    boxPadding: { control: { type: 'number' } },
    className: { control: { type: 'text' } },
  },
} as Meta;

const Template: Story<tabPanelType> = (args) => <TabPanel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <div>탭 내용 들어가는 곳</div>,
  currentTab: 0,
  index: 0,
};
