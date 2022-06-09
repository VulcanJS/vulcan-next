import React from "react";
import StyledComponentsButton from "../EmotionButton";
import StyledJSXButton from "../StyledJsxButton";
import { action } from "@storybook/addon-actions";
// Prefer addons-control
// import { boolean } from "@storybook/addon-knobs";

const defaultProps = {
  onClick: () => {
    // FIXME: We currently need not to pass the event
    // Will probably be fixed in official v6 release
    // @see https://github.com/storybookjs/storybook/issues/6471
    action("You clicked a button")();
  },
};

export default {
  title: "vn/design-system/Button",
  //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

export const styledJSX = () => (
  <div>
    <StyledJSXButton {...defaultProps}>None</StyledJSXButton>
    <StyledJSXButton {...defaultProps} preferredTechnology="react">
      React
    </StyledJSXButton>
    <StyledJSXButton {...defaultProps} preferredTechnology="vulcan">
      Vulcan
    </StyledJSXButton>
    <StyledJSXButton {...defaultProps} preferredTechnology="graphql">
      GraphQL
    </StyledJSXButton>
  </div>
);
styledJSX.storyName = "Styled JSX + MUI + Dynamic props";

export const styledComponents = () => (
  <div>
    <StyledComponentsButton {...defaultProps}>None</StyledComponentsButton>
    <StyledComponentsButton {...defaultProps} preferredTechnology="react">
      React
    </StyledComponentsButton>
    <StyledComponentsButton {...defaultProps} preferredTechnology="vulcan">
      Vulcan
    </StyledComponentsButton>
    <StyledComponentsButton {...defaultProps} preferredTechnology="graphql">
      GraphQL
    </StyledComponentsButton>
  </div>
);

styledComponents.storyName = "Styled Components + MUI + Dynamic Props";

export const disabled = () => (
  <StyledComponentsButton {...defaultProps} disabled>
    Disabled
  </StyledComponentsButton>
);

export const addonControl = (args) => (
  <StyledComponentsButton {...defaultProps} {...args} />
);
addonControl.args = {
  ...defaultProps,
  children: "Tweak me in the Control tab!",
};
addonControl.argTypes = {
  preferredTechnology: {
    control: {
      type: "select",
      options: ["react", "vulcan", "graphql"],
    },
  },
};
