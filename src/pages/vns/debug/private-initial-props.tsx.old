/**
 * Demo an authenticated page
 * @see https://spectrum.chat/next-js/general/redirect-the-right-way~6d1b6631-340d-4de3-9127-8cf08ec02bcc
 * @see https://jasonraimondi.com/posts/secure-a-next-js-application-with-jwt-and-a-private-route-higher-order-component/#add-a-_privateroute_-higher-order-component-hoc-to-secure-the-app-from-unauthorized-access
 */
import Link from "next/link";
import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import debug from "debug";
const debugNext = debug("vns:next");

// @ssr-only
export const redirectServer = (ctx: NextPageContext) => (pathname: string) => {
  ctx.res.writeHead(302, { Location: pathname });
  ctx.res.end();
};

const isServerSideRenderCtx = (ctx?: NextPageContext) => {
  return !!(ctx && ctx.res && ctx.res.writeHead);
};
const isStaticRenderCtx = (ctx?: NextPageContext) => {
  return !!(ctx && ctx.res && !ctx.res.writeHead);
};
const isClientRender = () => {
  return typeof window !== undefined;
};
const PrivatePage: NextPage = () => {
  return (
    <>
      <div>Seeing a private page.</div>
      <div>
        <Link href="/vns/debug/public">
          <a>Back to public page</a>
        </Link>
      </div>
    </>
  );
};
// NOTE: we use getInitialProps to demo redirect, in order to keep things consistent
// with _app, that do not support getServerSideProps and getStaticProps at the time of writing (Next 9.4)
// When redirecting in a page, you could achieve a cleaner setup using getServerSideProps (not demonstrated here)
PrivatePage.getInitialProps = async (ctx?: NextPageContext) => {
  debugNext("Running page getInitialProps");
  const namespacesRequired = ["common"]; // i18n
  // We simulate private connexion
  const isAllowed = !!ctx.query.allowed; // demo
  const pageProps = { namespacesRequired, isAllowed };
  if (isAllowed) {
    return { ...pageProps, isAllowed };
  }
  if (isStaticRenderCtx(ctx)) {
    debugNext("Detected static render, not doing anything");
    // Scenario 1: we are in a static export
    // We do not do anything
  } else if (isServerSideRenderCtx(ctx)) {
    // Scenario 2: we are in a server-side render
    debugNext("Detected dynamic server-side rendering");
    debugNext("Redirecting (dynamic server render)");

    redirectServer(ctx)("/vns/debug/public");
  } else if (isClientRender()) {
    // Scenario 3: we are client-side
    debugNext("Detected client render");
    debugNext("Redirecting (client-side)");

    Router.push("/vns/debug/public");
  }
  return pageProps;
};
export default PrivatePage;
