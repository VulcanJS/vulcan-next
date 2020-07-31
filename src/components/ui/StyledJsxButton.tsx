/**
 * Demo of a button with some custom style,
 * combining styled-jsx and material-ui
 *
 * NOTE: if you use Material UI, we advise to use Styled Components instead
 */
// NOTE: you don't need to import React, it will be added at build time by Babel/Next

import clsx from "clsx";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@material-ui/core";
import colors from "~/lib/style/colors";

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
    <span>
      <MuiButton
        {...muiButtonProps}
        className={clsx("vns-button", props.className)}
      />
      <style jsx>
        {`
          /* @see https://github.com/vercel/styled-jsx#one-off-global-selectors */
          /* don't forget the & so the style stays scoped to the current button */
          & :global(.MuiButton-root) {
            color: ${technologyToColor[preferredTechnology] || colors.blueNext};
          }
        `}
      </style>
    </span>
  );
};
export default Button;
