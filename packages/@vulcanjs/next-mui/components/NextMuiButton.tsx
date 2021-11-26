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
    <NextLink {...linkProps}>
      <Button {...buttonProps}>{children}</Button>
    </NextLink>
  );
};
/**
 * Button to be used when using href and pointing toward a local page
 *
 * Do not pass href directly to Button or ListItemButton, this leads to bad UX
 * Use a Next link for better consistency (will use an SPA link)
 */
export const NextMuiListItemButton = (
  props: ListItemButtonProps & NextLinkProps
) => {
  const linkProps = pick(props, nextLinkProps);
  const buttonProps = omit(props, nextLinkProps);
  return (
    <NextLink {...linkProps} passHref>
      <ListItemButton component="a" {...buttonProps}></ListItemButton>
    </NextLink>
  );
};
