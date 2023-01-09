import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContentTextField from './ContentTextField';
export default {
  title: "Input/Content",
  component: ContentTextField,
  argTypes: {
    title: { control: "text" },
    textColor: { control: "text" },
  },
} as ComponentMeta<typeof ContentTextField>;

const Template: ComponentStory<typeof ContentTextField> = (args) => (
  <ContentTextField {...args} />
);

export const base = Template.bind({});