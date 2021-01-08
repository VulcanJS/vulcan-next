import { Typography } from "@material-ui/core";
/**
 * TODO: the useUser hook doesn't seem to be updated on route change when the component is put into _app
 */
// Taken from Next Passport example
import Link from "next/link";
import { useUser } from "~/components/user/hooks";

const Header = () => {
  const user = useUser();
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
          max-width: 1000px;
          margin: auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: violet;
          text-decoration: none;
        }
        footer {
          color: #000;
          border-top: 1px solid;
          border-image-source: linear-gradient(10deg, #e1009855, #3f77fa55);
          border-image-slice: 1;
          border-color: #3f77fa;
        }
      `}</style>
    </footer>
  );
};

export default Header;
