import React from "react";
import { NextLinkComposed, NextLinkComposedProps } from "../Link";
// import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

export default {
  title: "next-mui/NextMuiLink",
  component: NextLinkComposed,
  //  decorators: [(Story) => <div><Story /></div>,
  args: {},
} as Meta<NextLinkComposedProps>;

const Template: Story<NextLinkComposedProps> = (args) => (
  <NextLinkComposed {...args} />
);

// please keep this default story as is => it serves as a basis for Jest unit tests as well
export const DefaultNextMuiLink = Template.bind({});

// export const Basic = Template.bind({})
// Basic.args = { ...DefaultNextMuiLink.args/*, add other props here */ }
