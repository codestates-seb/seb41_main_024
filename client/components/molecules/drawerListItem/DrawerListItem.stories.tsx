import { ComponentStory, ComponentMeta } from "@storybook/react";
import DrawerListItem from './DrawerListItem';

export default {
  title: "Drawer/ListItem",
  component: DrawerListItem ,
  argTypes: {
    title: { control: "text" },
    textColor: { control: "text" },
  },
} as ComponentMeta<typeof DrawerListItem >;

const Template: ComponentStory<typeof DrawerListItem> = (args) => (
  <DrawerListItem {...args} />
);

export const base = Template.bind({});