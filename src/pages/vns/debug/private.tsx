/**
 * Demo a private page
 *
 * @see https://github.com/VulcanJS/vulcan-next-starter/issues/49
 * @see https://github.com/vercel/next.js/discussions/14531
 */
import Link from "next/link";
import { NextPage } from "next";
import { withPrivateAccess } from "@vulcanjs/next-utils";
//import debug from "debug";
// const debugNext = debug("vns:next");

interface PrivatePageProps {}
const PrivatePage: NextPage<PrivatePageProps> = (props) => {
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
//PrivatePage.getInitialProps = async (ctx?: NextPageContext) => {
//  return pageProps;
//};
export default withPrivateAccess({
  isAllowedClient: async (props, ctx) => {
    /**
     * @client-only
     * Your logic to check if user is allowed, client-side
     *
     * Here we use a query param, in real life you might want to check
     * the presence of a cookie or a token in the localStorage
     *
     * The function is overly complex because router.query is sometimes empty,
     * but location.search is also outdated when running getInitialProps
     * So I have to differentiate scenarios
     * It would be simpler in a normal app (just a localStorage.get call)
     */
    let isAllowed;
    if (ctx) {
      // We are in a getInitialProps call, ctx is providing infos about the URL
      // (window.location is still poiting to previous page so we can't use it)
      isAllowed = !!ctx.query.allowed; // demo
    } else {
      // We are in the component render, we can use window
      const urlParams = new URLSearchParams(window.location.search);
      isAllowed = !!urlParams.get("allowed");
    }
    return { isAllowed };
  },
  isAllowedServer: async (props, ctx) => {
    // We can do async calls here
    const isAllowed = !!ctx.query.allowed;
    return { isAllowed };
  },
  defaultRedirection: "/vns/debug/public",
})(PrivatePage);
