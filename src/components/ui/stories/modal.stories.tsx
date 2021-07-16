import React from "react";
import { Modal } from "../Modal";
import { Typography } from "@material-ui/core";
// import { action } from "@storybook/addon-actions";
// Prefer addon-control

const defaultProps = {};

export default {
  title: "VN/design-system/Modal",
  component: Modal,
  //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

export const basic = (args) => (
  <Modal {...defaultProps} {...args}>
    <div>
      <Typography>"I am an humble modal content.</Typography>
    </div>
  </Modal>
);
basic.story = {
  name: "default props",
  // decorators: [...],
  // parameters: {...}
};

/** deprecated: we no longer used styled-components modifiers library
export const vulcan = () => (
  <Modal modifiers={["vulcan"]} {...defaultProps}>
    <div>
      <Typography>"I am a Vulcan modal, very orange."</Typography>
    </div>
  </Modal>
);
*/
