import BottomNav from './BottomNav';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'organisms/BottomNav',
  component: BottomNav,
} as ComponentMeta<typeof BottomNav>;

const Template: ComponentStory<typeof BottomNav> = (args) => <BottomNav {...args} />;

export const bottomNav = Template.bind({});
