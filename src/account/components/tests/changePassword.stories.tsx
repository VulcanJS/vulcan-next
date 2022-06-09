import React from "react";
import {
  ChangePasswordForm,
  ChangePasswordProps,
  initialState,
} from "../ChangePassword";
// import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

export default {
  title: "user/ChangePassword",
  component: ChangePasswordForm,
  //  decorators: [(Story) => <div><Story /></div>,
  args: {
    state: initialState,
  },
} as Meta<ChangePasswordProps>;

const Template: Story<ChangePasswordProps> = (args) => (
  <ChangePasswordForm {...args} />
);

// please keep this default story as is => it serves as a basis for Jest unit tests as well
export const DefaultChangePassword = Template.bind({});

export const Errored = Template.bind({});
Errored.args = { state: { ...initialState, errorMsg: "An error occurred" } };
export const Success = Template.bind({});
Success.args = { state: { ...initialState, successMsg: "Updated password" } };
export const Loading = Template.bind({});
Loading.args = { state: { ...initialState, loading: true } };

// export const Basic = Template.bind({})
// Basic.args = { ...DefaultChangePassword.args/*, add other props here */ }
