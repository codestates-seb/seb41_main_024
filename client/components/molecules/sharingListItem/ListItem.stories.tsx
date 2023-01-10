import SharingListItem from './SharingListItem';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: 'molecules/SharingListItem',
  //storybook에서 렌더링할 컴포넌트
  component: SharingListItem,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
  argTypes: {
    title: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    isHeart: { control: 'text' },
  },
} as ComponentMeta<typeof SharingListItem>;

//Template은 말그대로 하나의 템플릿이 된다.
//앞에서 설정한 props들을 테스트하려면 각 props를 가지는 컴포넌트를 생성해야할텐데,
//이 컴포넌트들을 생성하게 해줄 prototype의 개념으로 보면 될 듯하다.
const Template: ComponentStory<typeof SharingListItem> = (args) => (
  <SharingListItem {...args} />
);
//Template.bind({})메서드는 정해진 문법이다. Template은 그냥 변수라서 다른 이름을 지정해도 된다.
export const sharingListItem = Template.bind({});

sharingListItem.args = {
  src: '/sharingList/pepsi.svg',
  alt: '펩시콜라',
  isHeart: true,
  title:
    '펩시 100캔 소분하실분 구합니다 2일동안만 모집해요 집 앞에서 만나실 분',
};
