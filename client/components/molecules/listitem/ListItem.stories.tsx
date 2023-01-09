import ListItem from './ListItem';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: 'molecules/ListItem',
  //storybook에서 렌더링할 컴포넌트
  component: ListItem,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
  argTypes: {
    title: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    heartSrc: { control: 'text' },
    heartAlt: { control: 'text' },
  },
} as ComponentMeta<typeof ListItem>;

//Template은 말그대로 하나의 템플릿이 된다.
//앞에서 설정한 props들을 테스트하려면 각 props를 가지는 컴포넌트를 생성해야할텐데,
//이 컴포넌트들을 생성하게 해줄 prototype의 개념으로 보면 될 듯하다.
const Template: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
);
//Template.bind({})메서드는 정해진 문법이다. Template은 그냥 변수라서 다른 이름을 지정해도 된다.
export const sharingListItem = Template.bind({});

sharingListItem.args = {
  src: '/sharingList/pepsi.svg',
  alt: '펩시콜라',
  title: '제로콜라 100캔 소분하실 분 구합니다',
  heartSrc: '/sharingList/heart.svg',
};
