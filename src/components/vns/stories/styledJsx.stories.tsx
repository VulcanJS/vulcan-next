//import React from "react";
import StyledJsx from "../styledJsx";

export default {
  title: "VNS/StyledJSX",
  component: StyledJsx,
};

export const basic = () => <StyledJsx />;

export const withNonStyled = () => (
  <div>
    <StyledJsx />
    <h1>I am not red</h1>
  </div>
);
