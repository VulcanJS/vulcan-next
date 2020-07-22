import React from "react";
import { Modal } from "../Modal";
import { Typography } from "@material-ui/core";
// import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";

const defaultProps = {};

export default {
  title: "VNS/design-system/Modal",
  component: Modal,
  //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

export const basic = () => (
  <Modal {...defaultProps}>
    <div>
      <Typography>
        {text("content", "I am an humble modal content.")}
      </Typography>
    </div>
  </Modal>
);
basic.story = {
  name: "default props",
  // decorators: [...],
  // parameters: {...}
};

export const vulcan = () => (
  <Modal modifiers={["vulcan"]} {...defaultProps}>
    <div>
      <Typography>
        {text("content", "I am a Vulcan modal, very orange.")}
      </Typography>
    </div>
  </Modal>
);
