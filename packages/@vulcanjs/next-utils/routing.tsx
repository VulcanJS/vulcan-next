/**
 * Demo a private page
 *
 * @see https://github.com/VulcanJS/vulcan-next-starter/issues/49
 * @see https://github.com/vercel/next.js/discussions/14531
 */
import React from "react";
import { NextPage, NextPageContext } from "next";
import Router, { useRouter } from "next/router";
import { isServerRenderCtx, isClientRender, isStaticExportCtx } from "./ssr";
import debug from "debug";
import { useEffect, useState } from "react";
const debugNext = debug("vns:next");
import _merge from "lodash/merge";

// @ssr-only
export const redirectServer = (ctx: NextPageContext) => (pathname: string) => {
  ctx.res.writeHead(302, { Location: pathname });
  ctx.res.end();
};

interface RedirectResult {
  authProps?: Object;
  redirection?: string;
  isAllowed: boolean;
}
interface PrivateAccessOptions {
  defaultRedirection?: string;
  isAllowedServer: (
    pageProps: any,
    ctx: NextPageContext
  ) => Promise<RedirectResult>; // return false if the user is allowed
  isAllowedClient: (
    props: any,
    ctx?: NextPageContext
  ) => Promise<RedirectResult>; // return false if the user is not allowed
  LoaderComponent: React.ComponentType; // Will be rendered during the client check. It's advised not to use this, you risk to have some annoying flash
}

// relevant defaults so you don't accidentally show a private page
const defaultOptions: PrivateAccessOptions = {
  defaultRedirection: "/",
  LoaderComponent: () => <></>,
  isAllowedClient: async () => ({
    isAllowed: false,
  }),
  isAllowedServer: async () => ({
    isAllowed: false,
  }),
};
interface PrivatePageProps {
  isStaticExport?: boolean;
  isServerRender?: boolean;
  isAllowedDuringSSR?: boolean;
}
/**
 * Makes a page private.
 *
 * You can pass default options or page options, they will be merged automatically.
 * For example:
 * const customWithPrivateAccess = withPrivateAccess(myDefaultOptions) // reuse for all your pages
 * ...
 * export default customWithPrivateAccess(MyPrivatePage, myPageSpecificOptions)
 *
 * or simply
 *
 * export default MyPrivatePage = withPrivateAccess()(MyPage, myPageSpecificOptions)
 *
 * TODO: update on Vulcan AccessControl component
 */
export const withPrivateAccess = (
  hocOptions?: Partial<PrivateAccessOptions>
) => (Page: NextPage, pageOptions?: Partial<PrivateAccessOptions>) => {
  const options: PrivateAccessOptions = _merge(
    {},
    defaultOptions,
    hocOptions || {},
    pageOptions || {}
  );
  const {
    isAllowedClient,
    isAllowedServer,
    defaultRedirection,
    LoaderComponent,
  } = options;

  const PrivatePage: NextPage<PrivatePageProps> = (props) => {
    // SCENARIO 1: handle redirection and rendering purely client-side, after static export or during a client-side redirect
    const router = useRouter();
    const [isAllowedState, setAllowedState] = useState(false); // use state to avoid the flash
    const { isAllowedDuringSSR } = props;
    useEffect(() => {
      const checkAccess = async () => {
        const { isAllowed, redirection } = await isAllowedClient(props);
        if (!isAllowed) {
          debugNext("Redirecting client-side");
          router.push(redirection || defaultRedirection);
        } else {
          setAllowedState(true);
        }
      };
      checkAccess();
    }, [router, props]);
    // SCENARIO 1.1: static export (rendering server side at build time)
    const { isStaticExport } = props;
    if (isStaticExport && !isClientRender()) {
      debugNext(
        "We render nothing during static export, server side this is a private page (only rendered client side)"
      );
      return <></>;
      // SCNEARIO 1.2: client render
      // SCENARIO 1.2.1 : client render after a server render (we know if user is allowed thanks to initialProps)
      // and 1.2.2: client render after a client redirect (we must wait for the useEffect to run)
    } else if (isClientRender() && !(isAllowedDuringSSR || isAllowedState)) {
      debugNext(
        "We render nothing if user is not allowed or a redirect is happening or we simply wait for the effect to run"
      );
      // we render nothing when waiting for a redirect or to check that we are allowed or not being auth (avoids a flash)
      return <LoaderComponent />;
    }
    debugNext("Rendering private page");

    return (
      <>
        <Page {...props} />
      </>
    );
  };

  // Initial Props

  const pageGetInitialProps = Page.getInitialProps;
  /**
   * At the time of writing, using getServerSideProps would be cleaner, but would disable
   * static export.
   * Instead we use getInitialProps, and treat SSR as special case
   *
   */
  PrivatePage.getInitialProps = async (ctx?: NextPageContext) => {
    debugNext("Running private page getInitialProps");
    const pageInitialProps = pageGetInitialProps
      ? pageGetInitialProps(ctx)
      : {}; // get the page initial props if any

    // SCENARIO 2: we are doing dynamic SSR
    // We redirect using HTTP
    if (isServerRenderCtx(ctx)) {
      debugNext("Detected dynamic server-side rendering");
      const { redirection, isAllowed, authProps = {} } = await isAllowedServer(
        pageInitialProps,
        ctx
      );
      if (!isAllowed) {
        debugNext("Redirecting (dynamic server render)");
        redirectServer(ctx)(redirection || defaultRedirection);
      } else {
        return {
          ...pageInitialProps,
          ...authProps,
          redirection,
          isServerRender: true,
          isStaticExport: false,
        };
      }
    } else if (isStaticExportCtx(ctx)) {
      debugNext("Detected static export");
      return {
        ...pageInitialProps,
        isStaticExport: true,
        isServerRender: false,
      };
      // SCENARIO 3: getInitialProps is called by a page change client side, we redirect directly here to avoid page flash
    } else if (isClientRender()) {
      debugNext("Detected client render");
      const { isAllowed, redirection, authProps = {} } = await isAllowedClient(
        pageInitialProps,
        ctx
      );
      if (!isAllowed) {
        debugNext("Redirecting (client-side, during getInitialProps call)");
        Router.push(redirection || defaultRedirection);
      }
      return { ...pageInitialProps, ...authProps };
    }

    return pageInitialProps;
  };

  return PrivatePage;
};
