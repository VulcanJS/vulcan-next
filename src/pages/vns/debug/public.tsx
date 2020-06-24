import Link from "next/link";
import { useRouter } from "next/router";
const PublicPage = () => {
  const router = useRouter();
  return (
    <>
      <h1>public</h1>
      <div>
        Set "debug" to "vns:next" in localStorage and check logs to see
        redirection happen.
      </div>
      <div>
        <Link href="/vns/debug/private">
          <a className="private">
            Link to a private page, should redirect you back here
          </a>
        </Link>
      </div>
      <div>
        <button
          className="private-shallow"
          onClick={() => {
            router.push("/vns/debug/private", undefined, { shallow: true });
          }}
        >
          Link to a private page, shallow redirect, should redirect you back
          here
        </button>
      </div>
      <div>
        <Link href="/vns/debug/private?allowed=true">
          <a className="private-allowed">
            Link to a private page, should not redirect you
          </a>
        </Link>
      </div>
      <div>
        <button
          className="private-allowed-shallow"
          onClick={() => {
            router.push("/vns/debug/private?allowed=true", undefined, {
              shallow: true,
            });
          }}
        >
          Link to a private page, shallow redirect, should not redirect you
        </button>
      </div>
    </>
  );
};
export default PublicPage;
