import React from "react";
import { Button } from "../Button";
// import { action } from "@storybook/addon-actions";

const defaultProps = {};

export default {
  title: "vns/design-system/Button",
  component: Button,
  //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

export const basic = () => <Button {...defaultProps}>Click me</Button>;
export const dynamicStyleFromProps = () => (
  <div>
    <Button {...defaultProps}>None</Button>
    <Button preferredTechnology="react">React</Button>
    <Button preferredTechnology="vulcan">Vulcan</Button>
    <Button preferredTechnology="graphql">GraphQL</Button>
  </div>
);
basic.story = {
  name: "default props",
  // decorators: [...],
  // parameters: {...}
};
