// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js
// /* eslint-disable jsx-a11y/anchor-has-content */
import React, { Ref } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

type LinkProps = NextLinkProps &
  MuiLinkProps & {
    activeClassName?: string;
    naked?: boolean;
  };

const NextComposed = React.forwardRef(function NextComposed(
  props: LinkProps,
  ref: Ref<HTMLAnchorElement>
) {
  const { href, ...other } = props;

  return (
    <NextLink href={href}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  // href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // FIXME: provokes a TS error
  prefetch: PropTypes.bool,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps) {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    innerRef,
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
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default React.forwardRef((props: LinkProps, ref) => (
  <Link {...props} innerRef={ref} />
));
