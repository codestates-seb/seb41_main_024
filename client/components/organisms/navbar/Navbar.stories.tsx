import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Navbar from "./Navbar";

export default {
  title: "Navbar/Navbar",
  component: Navbar,
  argTypes: {},
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar />;

export const storybookNavbar = Template.bind({});
storybookNavbar.args = {
  primary: true,
  label: "Button",
};
