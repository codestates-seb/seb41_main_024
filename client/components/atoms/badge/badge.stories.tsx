import Badge from './Badge';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Badge',
  component: Badge,
  argTypes: {
    isOpen: { control: 'text' },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;
