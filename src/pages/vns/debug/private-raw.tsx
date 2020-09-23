/**
 * Demo a private page
 *
 * @see https://github.com/VulcanJS/vulcan-next-starter/issues/49
 * @see https://github.com/vercel/next.js/discussions/14531
 */
import Link from "next/link";
import { NextPage, NextPageContext } from "next";
import Router, { useRouter } from "next/router";
import {
  isServerRenderCtx,
  isClientRender,
  isStaticExportCtx,
} from "@vulcanjs/next-utils";
import debug from "debug";
import { useEffect, useState } from "react";
const debugNext = debug("vns:next");

// @ssr-only
export const redirectServer = (ctx: NextPageContext) => (pathname: string) => {
  ctx.res.writeHead(302, { Location: pathname });
  ctx.res.end();
};

/**
 * @client-only
 * Your logic to check if user is allowed, client-side
 *
 * Here we use a query param, in real life you might want to check
 * the presence of a cookie or a token in the localStorage
 * NOTE: router.query is sometimes empty, henve the URLSearchParams
 */
const isAllowedClient = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return !!urlParams.get("allowed");
};

interface PrivatePageProps {
  isStaticExport?: boolean;
  isServerRender?: boolean;
  isAllowedDuringSSR?: boolean;
}
const PrivatePage: NextPage<PrivatePageProps> = (props) => {
  // SCENARIO 1: handle redirection and rendering purely client-side, after static export or during a client-side redirect
  const router = useRouter();
  const [isAllowedState, setAllowedState] = useState(false); // use state to avoid the flash
  const { isAllowedDuringSSR } = props;
  useEffect(() => {
    const isAllowed = isAllowedClient();
    if (!isAllowed) {
      debugNext("Redirecting client-side");
      router.push("/vns/debug/public");
    } else {
      setAllowedState(true);
    }
  }, [router]);
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
    return <></>;
  }
  debugNext("Rendering private page");

  return (
    <>
      <h1>private</h1>
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
  //throw new Error("STATIC");
  debugNext("Running page getInitialProps");
  const namespacesRequired = ["common"]; // i18n
  // We simulate private connexion
  const isAllowed = !!ctx.query.allowed; // demo
  const pageProps = { namespacesRequired, isAllowedDuringSSR: isAllowed };
  // SCENARIO 2: we are doing dynamic SSR
  // We redirect using HTTP
  if (isServerRenderCtx(ctx)) {
    debugNext("Detected dynamic server-side rendering");
    if (!isAllowed) {
      debugNext("Redirecting (dynamic server render)");
      redirectServer(ctx)("/vns/debug/public");
    } else {
      return { ...pageProps, isServerRender: true, isStaticExport: false };
    }
  } else if (isStaticExportCtx(ctx)) {
    debugNext("Detected static export");
    return { ...pageProps, isStaticExport: true, isServerRender: false };
    // SCENARIO 3: getInitialProps is called by a page change client side, we redirect directly here to avoid page flash
  } else if (isClientRender()) {
    debugNext("Detected client render");
    if (!isAllowed) {
      debugNext("Redirecting (client-side)");
      Router.push("/vns/debug/public");
    }
  }

  return pageProps;
};
export default PrivatePage;
