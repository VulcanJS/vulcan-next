/**
 * Demo of a button with some custom style,
 * combining emotion/styled and material-ui
 *
 */
// NOTE: you don't need to import React, it will be added at build time by Babel/Next
import clsx from "clsx";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@material-ui/core";
import colors from "~/lib/style/colors";
import { styled } from "@material-ui/core/styles";
import { lighten } from "polished";

const technologyToColor = {
  react: colors.lightBlueReact,
  vulcan: colors.orangeVulcan,
  graphql: colors.pinkGraphql,
};

// Without material UI:
//interface ButtonProps extends React.ComponentProps<"button"> {} // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36505#issuecomment-549394273

// With material UI:
interface ButtonProps extends MuiButtonProps {
  preferredTechnology?: "react" | "vulcan" | "graphql"; // demo of a custom prop
}
export const Button = (props: ButtonProps) => {
  const { preferredTechnology, ...muiButtonProps } = props;
  return (
    <MuiButton
      {...muiButtonProps}
      className={clsx("vns-button", props.className)}
    />
  );
};
const StyledButton = styled(Button)`
  &.MuiButton-root {
    /* The & is mandatory to have the correct specificity*/
    background-color: ${(props) =>
      props.preferredTechnology
        ? technologyToColor[props.preferredTechnology]
        : colors.blueNext};

    transition: "background-color 0.2s linear";

    &:hover {
      background-color: ${colors.yellowVulcan};
    }
    &:focus {
      outline: 2px solid ${colors.blueNext};
      outline-offset: 1px;
    }
    &:active {
      background-color: ${colors.darkOrangeVulcan};
    }
    &:disabled {
      background-color: ${lighten(0.6, colors.greyVulcan)};
    }
  }
`;
export default StyledButton;
