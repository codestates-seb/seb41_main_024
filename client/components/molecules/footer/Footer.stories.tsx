import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer from './Footer';
export default {
  title: 'molecules/Footer',
  component: Footer,
  argTypes: {
    title: { control: 'text' },
    textColor: { control: 'text' },
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const footer = Template.bind({});
