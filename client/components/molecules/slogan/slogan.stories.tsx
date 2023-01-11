import Slogan from './Slogan';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: 'molecules/Slogan',
  //storybook에서 렌더링할 컴포넌트
  component: Slogan,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
} as ComponentMeta<typeof Slogan>;

//Template은 말그대로 하나의 템플릿이 된다.
//앞에서 설정한 props들을 테스트하려면 각 props를 가지는 컴포넌트를 생성해야할텐데,
//이 컴포넌트들을 생성하게 해줄 prototype의 개념으로 보면 될 듯하다.
const Template: ComponentStory<typeof Slogan> = (args) => <Slogan />;
export const slogan = Template.bind({});
