import Image from "./Image";
import pepsi from "../../../src/assets/pepsi.svg";
import { ComponentStory, ComponentMeta } from "@storybook/react";
export default {
  //storybook에서 분류할 폴더 Input 폴더 안에 Dropdown 컴포넌트가 만들어진다.
  title: "Images/sharingList",
  //storybook에서 렌더링할 컴포넌트
  component: Image,
  //컴포넌트 props (렌더링하고자 하는 컴포넌트가 받는 props를 여기다 적으면 된다.)
  argTypes: {
    src: { control: "text" },
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Pepsi = Template.bind({});
Pepsi.args = {
  src: pepsi,
};
