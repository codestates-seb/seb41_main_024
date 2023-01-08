import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navbar from './Navbar';

export default {
  title: 'Navbar/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const storybookNavbar = Template.bind({});
