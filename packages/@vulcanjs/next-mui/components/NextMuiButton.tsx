import {
  Button,
  ButtonProps,
  ListItemButton,
  ListItemButtonProps,
} from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import pick from "lodash/pick";
import omit from "lodash/omit";

const nextLinkProps: Array<keyof NextLinkProps> = [
  "href",
  "as",
  "replace",
  "scroll",
  "shallow",
  "passHref",
  "prefetch",
  "locale",
];
/**
 * Button to be used when using href and pointing toward a local page
 */
export const NextMuiButton = ({
  children,
  ...props
}: ButtonProps & NextLinkProps) => {
  const linkProps = pick(props, nextLinkProps);
  const buttonProps = omit(props, nextLinkProps);
  return (
    <Button {...buttonProps}>
      <NextLink {...linkProps}>{children}</NextLink>
    </Button>
  );
};
/**
 * Button to be used when using href and pointing toward a local page
 */
export const NextMuiListItemButton = ({
  children,
  ...props
}: ListItemButtonProps & NextLinkProps) => {
  const linkProps = pick(props, nextLinkProps);
  const buttonProps = omit(props, nextLinkProps);
  return (
    <ListItemButton {...buttonProps}>
      <NextLink {...linkProps}>{children}</NextLink>
    </ListItemButton>
  );
};
