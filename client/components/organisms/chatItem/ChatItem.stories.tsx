import ChatItem from './ChatItem';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'organisms/Chat Item',
  component: ChatItem,
  argTypes: {
    recruitment: { control: 'boolean' },
    title: { control: 'text' },
    lastMessage: { control: 'text' },
    address: { control: 'text' },
    unreadCount: { control: 'number' },
    imageLink: { control: 'text' },
  },
} as ComponentMeta<typeof ChatItem>;

const Template: ComponentStory<typeof ChatItem> = (args) => (
  <ChatItem {...args} />
);

export const Opened = Template.bind({});
Opened.args = {
  recruitment: false,
  title: '아삭아삭 나주배 3kg',
  lastMessage: '[알림] 멸치광인님이 입장하셨습니다.',
  address: '서울 강남구 삼성동',
  unreadCount: 3,
  imageLink: '/chatItem/productImg.svg',
};

export const Closed = Template.bind({});

Closed.args = {
  recruitment: true,
  title: '손소독제 공동 구매',
  lastMessage: '어디에서 만날까요?',
  address: '서울 서초구 방배동',
  unreadCount: 0,
  imageLink: '/chatItem/productImg02.svg',
};
