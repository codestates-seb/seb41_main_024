import NavbarBtn from './NavbarBtn';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Navbar/Navbar Button',
  component: NavbarBtn,
} as ComponentMeta<typeof NavbarBtn>;

const Template: ComponentStory<typeof NavbarBtn> = (args) => (
  <NavbarBtn {...args} />
);

export const BasicButton = Template.bind({});
BasicButton.args = {
  name: '홈',
  path: '/',
  isNewBtn: false,
};

export const NewButton = Template.bind({});
NewButton.args = {
  name: 'N게더 모집',
  path: '/new',
  isNewBtn: true,
};
