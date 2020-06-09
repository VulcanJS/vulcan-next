import { useQuery /*, useMutation*/ } from "@apollo/client";
import gql from "graphql-tag";
import Home from "~/components/home";
//import { useForm } from "react-hook-form";

const HomePage = () => {
  const vulcanSiteDataQuery = gql`
    query getSiteData {
      SiteData {
        url
        title
        sourceVersion
        logoUrl
      }
    }
  `;

  const { data, loading, error } = useQuery(vulcanSiteDataQuery);

  let content;
  if (loading) {
    content = `Connecting to your graphQL backend...`; // on ${client.name}`
  } else if (error) {
    if (error.networkError?.message === "Failed to fetch") {
      content = `No graphQL backend is running.`;
    } else {
      content = `Couldn't connect to your graphQL backend (${error}).`;
    }
  } else if (data) {
    content = `Successfully connected to your graphQL backend.\n Data: ${JSON.stringify(
      data,
      null,
      4
    )}`;
  }
  // const { error, data } = useQuery(gql`
  //   query current {
  //     currentUser {
  //       _id
  //     }
  //   }
  // `)
  // const currentUser = data ? data.currentUser : null

  // const [logout] = useMutation(gql`
  //   mutation logout {
  //     logout {
  //       userId
  //     }
  //   }
  // `)

  // const [login, { data: loginData }] = useMutation(gql`
  //   mutation login($input: AuthPasswordInput) {
  //     authenticateWithPassword(input: $input) {
  //       userId
  //       token
  //     }
  //   }
  // `)

  // const { handleSubmit, register, errors } = useForm();
  // console.log('errors', errors)
  // const onSubmit = values => {
  //   login({ variables: { input: { userSelector: { username: values.username }, password: values.password } } })
  // };

  // const userId = currentUser
  //   ? currentUser._id
  //   : loginData
  //     ? loginData.authenticateWithPassword.userId
  //     : null
  return (
    <div className="container">
      <main>
        <Home />
        {content}

        {/* {!!error && (
          <div>
            <p>Could not fetch current user!</p>
          </div>
        )}
        {loginData && (
          <div>
            <div>You just logged in, your meteor_login_token is: {loginData.authenticateWithPassword.token}</div>
            <div>Store this token into the `meteor_login_token` cookie or pass it as the Authorization header to make authorized queries.</div>
          </div>
        )}
        {userId
          ? (
            <div>
              You are logged in from a Vulcan application as {userId}
              <button onClick={() => logout()}>Logout</button>
            </div>
          )
          :(
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="username"
                  ref={register({
                    required: 'Required',
                  })}
                />
                <input
                  name="password"
                  type="password"
                  ref={register({
                    required: 'Required'
                  })}
                />
                <button type="submit">Login using a Vulcan app</button>
              </form>
            </div>
          )
        } */}
      </main>
    </div>
  );
};

export default HomePage;
