import TextField from './TextField';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  title: 'Input/Password',
  component: TextField,
  argTypes: {
    title: { control: 'text' },
    textColor: { control: 'text' },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);
export const Password = Template.bind({});
