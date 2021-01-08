/**
 * Demo authentication to a legacy Vulcan backend
 *
 * For new application, see the /login endpoint instead, that uses Next directly
 */
//import { useForm } from "react-hook-form";
import { VulcanMeteorHooks } from "@vulcanjs/meteor-legacy";

const AuthPage = () => {
  const currentUserResult = VulcanMeteorHooks.useCurrentUser();

  const [login] = VulcanMeteorHooks.useAuthenticateWithPassword();
  const [signup] = VulcanMeteorHooks.useSignup();
  const [logout] = VulcanMeteorHooks.useLogout();
  return (
    <div>
      <main>
        <h2>Current User</h2>
        {currentUserResult.loading && "Loading current user..."}
        {currentUserResult.error && "Can't get current user"}
        {currentUserResult.data &&
          `Got current user: ${JSON.stringify(currentUserResult.data)}`}
        {/*<Home />*/}
        {!(
          currentUserResult &&
          currentUserResult.data &&
          currentUserResult.data.currentUser
        ) && (
          <>
            <h2>Signup</h2>
            <form
              onSubmit={async (evt) => {
                evt.preventDefault();
                const email = evt.target["email"].value;
                const password = evt.target["password"].value;
                await signup({ input: { email, password } });
                window.location.reload();
              }}
            >
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
              <button type="submit">Sign up</button>
            </form>
            <h2>Login</h2>
            <form
              onSubmit={async (evt) => {
                evt.preventDefault();
                const email = evt.target["email"].value;
                const password = evt.target["password"].value;
                const { data } = await login({ input: { email, password } });
                window.location.reload();
                //const { authenticateWithPassword } = data;
                //const { token } = authenticateWithPassword;
                //window.localStorage.setItem("meteor_login_token", token);
              }}
            >
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
              <button type="submit">Login</button>
            </form>
          </>
        )}
        {currentUserResult &&
          currentUserResult.data &&
          currentUserResult.data.currentUser && (
            <>
              <h2>Logout</h2>
              <button
                onClick={async () => {
                  await logout();
                  //window.localStorage.removeItem("meteor_login_token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          )}
      </main>

      <style jsx>{`
        main {
          border-left: 72px solid;
          padding-left: 24px;
          border-image-source: linear-gradient(10deg, #e1009855, #3f77fa55);
          border-image-slice: 1;
          border-color: #3f77fa;
        }
      `}</style>
    </div>
  );
};

// export default withApollo({ graphqlUri })(MyApp, { getDataFromTree });

export default AuthPage;
