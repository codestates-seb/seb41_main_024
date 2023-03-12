import React from 'react';
import { Story, Meta } from '@storybook/react';
import Footer from './Footer';

export default {
  title: 'Molecules/Footer',
  component: Footer,
} as Meta;

type FooterProps = React.ComponentProps<typeof Footer>;

const Template: Story<FooterProps> = () => <Footer />;
export const Default = Template.bind({});
Default.args = {};
