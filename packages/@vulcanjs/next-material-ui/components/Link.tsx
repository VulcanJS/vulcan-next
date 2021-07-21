// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js
// /* eslint-disable jsx-a11y/anchor-has-content */
import React, { Ref } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

interface NextComposedProps extends NextLinkProps {
  anchorProps?: React.HTMLProps<HTMLAnchorElement>;
  className?: string;
}

/**
 * A Next Link with an inner <a> anchor + ref passing
 */
const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  function NextComposed(props, ref) {
    const { anchorProps = {}, children, className, ...other } = props;

    return (
      <NextLink {...other}>
        <a
          ref={ref}
          {...anchorProps}
          className={clsx(anchorProps.className, className)}
          children={children}
        />
      </NextLink>
    );
  }
);

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  // href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // FIXME: provokes a TS error
  prefetch: PropTypes.bool,
};

type BaseLinkProps = {
  activeClassName?: string;
  children?: React.ReactNode;
  naked?: boolean;
} & Pick<MuiLinkProps<"a", NextComposedProps>, "className" | "ref">;

// FIXME: this discriminated union doesn't work as expected based on the "naked" property
/** Props when one wants a Next Link + a <a> tag, without using Material UI Link */
// type NakedLinkProps = NextLinkProps & BaseLinkProps & { naked: true };
// type MuiNextLinkProps = MuiLinkProps<"a", NextComposedProps> &
//   BaseLinkProps & { naked?: false };
// type LinkProps = MuiNextLinkProps | NakedLinkProps;
type LinkProps = NextLinkProps &
  MuiLinkProps<"a", NextComposedProps> &
  BaseLinkProps;

/**
 * Material UI Link + Next Link + an <a> anchor
 *
 * Use as a replacement for Material UI Link in Next.js applications
 */
const Link: React.FC<LinkProps> = (props) => {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    // ref props from material ui
    // NOTE: typings is currently wrong (07/2021), see https://github.com/mui-org/material-ui/issues/24901
    ref,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        anchorProps={{ className }}
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={ref}
      // Next type href (that can be an object) is not accepted for some reason
      href={href}
      {...other}
    />
  );
};

/*
Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  // innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};
*/

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} ref={ref} />
));
