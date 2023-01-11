import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Footer from './Footer';
export default {
  title: 'molecules/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;
const Template: ComponentStory<typeof Footer> = (args) => <Footer />;
export const footer = Template.bind({});
