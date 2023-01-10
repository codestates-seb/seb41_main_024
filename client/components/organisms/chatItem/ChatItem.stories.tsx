import ChatItem from './ChatItem';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductImg from '../../../public/chatItem/productImg.svg';

export default {
  title: 'ChatList/Chat Item',
  component: ChatItem,
} as ComponentMeta<typeof ChatItem>;

const Template: ComponentStory<typeof ChatItem> = (args) => (
  <ChatItem {...args} />
);

export const chatItem = Template.bind({});
chatItem.args = {
  thumbnail: ProductImg,
  isOpen: true,
  title: '아삭아삭 나주배 3kg',
  price: '9,850',
  spot: '서울 서초구',
};

export const chatItemAlert = Template.bind({});
chatItemAlert.args = {
  thumbnail: ProductImg,
  isOpen: true,
  title: '남해안 디포리 멸치다시팩 15g * 20팩',
  price: '12,750',
  spot: '제주 연동',
};
