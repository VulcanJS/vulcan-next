import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";

export default {
  title: "VNS/TypeScript",
  component: Button,
};

interface MyComponentProps {
  children: React.ReactNode;
}
const MyComponent = (props: MyComponentProps) => <p>{props.children}</p>;

export const Text = () => (
  <div>
    <MyComponent>This story comes from a .tsx file</MyComponent>
    <Button onClick={action("clicked")}>Hello TypeScript Button</Button>
  </div>
);
