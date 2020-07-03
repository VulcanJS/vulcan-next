import React from "react";
import StyledComponentsButton from "../StyledComponentsButton";
import StyledJSXButton from "../StyledJsxButton";
// import { action } from "@storybook/addon-actions";

const defaultProps = {};

export default {
  title: "vns/design-system/Button",
  //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

export const styledJSX = () => (
  <div>
    <StyledJSXButton {...defaultProps}>None</StyledJSXButton>
    <StyledJSXButton preferredTechnology="react">React</StyledJSXButton>
    <StyledJSXButton preferredTechnology="vulcan">Vulcan</StyledJSXButton>
    <StyledJSXButton preferredTechnology="graphql">GraphQL</StyledJSXButton>
  </div>
);
styledJSX.storyName = "Styled JSX + MUI + Dynamic props";

export const styledComponents = () => (
  <div>
    <StyledComponentsButton {...defaultProps}>None</StyledComponentsButton>
    <StyledComponentsButton preferredTechnology="react">
      React
    </StyledComponentsButton>
    <StyledComponentsButton preferredTechnology="vulcan">
      Vulcan
    </StyledComponentsButton>
    <StyledComponentsButton preferredTechnology="graphql">
      GraphQL
    </StyledComponentsButton>
  </div>
);

styledComponents.storyName = "Styled Components + MUI + Dynamic Props";
