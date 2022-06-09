import Head from "next/head";
import Link from "next/link";

const Layout = (props) => (
  <>
    <Head>
      <title>Auth</title>
    </Head>

    <main>
      <div className="container">
        {process.env.NEXT_PUBLIC_IS_USING_DEMO_DATABASE ? (
          <div>
            <p>You are using LBKE read-only demo database.</p>
            <p>
              To enable authentication features, please setup your own local
              database.
            </p>
            <p>
              See{" "}
              <Link href="/">
                <a>home README </a>
              </Link>{" "}
              for relevant instructions.
            </p>
          </div>
        ) : (
          props.children
        )}
      </div>
    </main>

    {/*<Footer />*/}

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>
  </>
);

export default Layout;
