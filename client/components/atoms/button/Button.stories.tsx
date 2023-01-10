import Button from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: 'atoms/Button',
  //storybook에서 렌더링할 컴포넌트
  component: Button,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
  argTypes: {
    heartButton: { control: 'text' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const FavoriteButton = Template.bind({});
FavoriteButton.args = {
  heartButton: 'heart',
};
