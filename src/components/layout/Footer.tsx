/**
 * TODO: the useUser hook doesn't seem to be updated on route change when the component is put into _app
 */
// Taken from Next Passport example
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "~/components/account/hooks";
import { apiRoutes } from "~/lib/api/apiRoutes";
import { routes } from "~/lib/routes";

const Footer = () => {
  const user = useUser();
  const router = useRouter();
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
                <Link href={routes.account.profile.href}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                {/* We use a GET request for logging out at the moment
                TODO: this should be replaced by an explicit POST request on click,
                side-effects with GET is a bad practice leading to all sort of troubles */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  onClick={async (evt) => {
                    evt.preventDefault();
                    await fetch(apiRoutes.account.logout.href, {
                      method: "POST",
                    });
                    window.location.replace(routes.home.href);
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={routes.account.login.href}>
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href={routes.account.signup.href}>
                  <a>Signup</a>
                </Link>
              </li>
            </>
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

export default Footer;
