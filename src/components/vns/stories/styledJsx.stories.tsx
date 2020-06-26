import StyledJsx from "../styledJsx";
import StyledJsxPostcss from "../styledJsxPostcss";

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

export const withPostCss = () => <StyledJsxPostcss />;
