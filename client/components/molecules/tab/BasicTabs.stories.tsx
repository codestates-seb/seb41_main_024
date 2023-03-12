import React, { SyntheticEvent, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import BasicTabs from './BasicTabs';
import { BasicTabsPropsType } from './basicTabsType';

export default {
  title: 'BasicTabs',
  component: BasicTabs,
  argTypes: {
    handleChange: { action: 'tab changed' },
    currentTab: { control: { type: 'number' } },
    bgcolor: { control: { type: 'color' } },
    color: { control: { type: 'color' } },
    tabLabels: { control: { type: 'array' } },
    centered: { control: { type: 'boolean' } },
    handleClick: { action: 'tab clicked' },
  },
} as Meta;

const Template: Story<BasicTabsPropsType> = (args) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (event: SyntheticEvent, newCurrentTab: number) => {
    setCurrentTab(newCurrentTab);
  };
  const handleClick = (e: any) => {
    const element = document.getElementById(`section-${e.target.id.slice(-1)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <BasicTabs
      {...args}
      currentTab={currentTab}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  bgcolor: '#63A8DA',
  color: 'white',
  tabLabels: ['Tab 1', 'Tab 2', 'Tab 3'],
  centered: false,
};
