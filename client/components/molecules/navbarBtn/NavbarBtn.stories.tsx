import NavbarBtn from './NavbarBtn';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import homeIcon from '../../../src/assets/navbar/home.svg';
import newIcon from '../../../src/assets/navbar/new.svg';

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
  iconSource: homeIcon,
  isNewBtn: false,
};

export const NewButton = Template.bind({});
NewButton.args = {
  name: 'N게더 모집',
  path: '/new',
  iconSource: newIcon,
  isNewBtn: true,
};
