import Link from "next/link";
const PublicPage = () => {
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
        <Link href="/vns/debug/private?allowed=true">
          <a className="private-allowed">
            Link to a private page, should not redirect you
          </a>
        </Link>
      </div>
    </>
  );
};
export default PublicPage;
