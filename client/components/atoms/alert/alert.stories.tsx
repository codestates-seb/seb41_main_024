import Alert from './Alert';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const alert = Template.bind({});
alert.args = {
  alertNum: '1',
};
