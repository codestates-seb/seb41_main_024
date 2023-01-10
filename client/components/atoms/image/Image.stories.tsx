import Img from './Image';

import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: 'Images/sharingList',
  //storybook에서 렌더링할 컴포넌트
  component: Img,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
  argTypes: {
    src: { control: 'text' },
    alt: { conrol: 'text' },
  },
} as ComponentMeta<typeof Img>;

const Template: ComponentStory<typeof Img> = (args) => <Img {...args} />;

export const Heart = Template.bind({});
Heart.args = {
  src: '/sharingList/heart.svg',
  alt: 'heart',
};

export const Pepsi = Template.bind({});
Pepsi.args = {
  src: '/sharingList/pepsi.svg',
  alt: 'pepsi',
};

export const FavoriteBorder = Template.bind({});
FavoriteBorder.args = {
  src: '/sharingList/favorite_border.svg',
  alt: 'haertborder',
};
