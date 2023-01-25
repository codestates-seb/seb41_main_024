import DropdownInput from './DropdownInput';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: 'Input/Dropdown',
  //storybook에서 렌더링할 컴포넌트
  component: DropdownInput,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
  argTypes: {
    title: { control: 'text' },
    textColor: { control: 'text' },
  },
} as ComponentMeta<typeof DropdownInput>;

//Template은 말그대로 하나의 템플릿이 된다.
//앞에서 설정한 props들을 테스트하려면 각 props를 가지는 컴포넌트를 생성해야할텐데,
//이 컴포넌트들을 생성하게 해줄 prototype의 개념으로 보면 될 듯하다.
const Template: ComponentStory<typeof DropdownInput> = (args) => (
  <DropdownInput {...args} />
);
//Template.bind({})메서드는 정해진 문법이다. Template은 그냥 변수라서 다른 이름을 지정해도 된다.
export const Dropdown = Template.bind({});
//이렇게 설정하면 해당 props를 전달받는 컴포넌트를 생성할 수 있다.
export const test = Template.bind({});
test.args = {
  label: 'Button',
};
