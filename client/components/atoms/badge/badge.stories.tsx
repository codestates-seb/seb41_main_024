import Badge from './Badge';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const open = Template.bind({});
open.args = {
  isOpen: true,
};

export const closed = Template.bind({});
closed.args = {
  isOpen: false,
};
