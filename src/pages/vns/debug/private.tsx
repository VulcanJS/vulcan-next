/**
 * Demo an authenticated page
 * @see https://spectrum.chat/next-js/general/redirect-the-right-way~6d1b6631-340d-4de3-9127-8cf08ec02bcc
 * @see https://jasonraimondi.com/posts/secure-a-next-js-application-with-jwt-and-a-private-route-higher-order-component/#add-a-_privateroute_-higher-order-component-hoc-to-secure-the-app-from-unauthorized-access
 */
import Link from "next/link";
import { NextPage, NextPageContext } from "next";
import Router, { useRouter } from "next/router";
import {
  isServerRenderCtx,
  isClientRender,
  isStaticExportCtx,
} from "@vulcan/next-utils";
import debug from "debug";
import { useEffect } from "react";
const debugNext = debug("vns:next");

// @ssr-only
export const redirectServer = (ctx: NextPageContext) => (pathname: string) => {
  ctx.res.writeHead(302, { Location: pathname });
  ctx.res.end();
};

interface PrivatePageProps {
  isStaticExport?: boolean;
  isServerRender?: boolean;
  isAllowed?: boolean;
}
const PrivatePage: NextPage<PrivatePageProps> = (props) => {
  // SCENARIO 1: handle redirection purely client-side after static export
  const router = useRouter();
  useEffect(() => {
    if (!router.query.allowed) {
      debugNext("Redirecting client-side");
      router.push("/vns/debug/public");
      //return <>"Redirecting..."</>;
    }
  });
  // Renders nothing in this this case
  const { isStaticExport } = props;
  console.log("props", props);
  if (isStaticExport) {
    debugNext(
      "We render nothing during static export, this is a private page (only rendered client side)"
    );
    return <></>;
  }

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
  const pageProps = { namespacesRequired, isAllowed };
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
