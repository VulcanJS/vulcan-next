import {
  useQuery,
  useMutation
} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useForm } from 'react-hook-form'
import { withVulcan } from '@vulcan/core'

const IS_PROD = process.env.NODE_ENV === 'production'

const graphqlUrl = IS_PROD
  ? process.env.GRAPHQL_URL
  : 'http://localhost:3001/graphql'

const Home = () => {
  const siteDataQuery = gql`
    query getSiteData {
      SiteData {
        url
        title
        sourceVersion
        logoUrl
      }
    }
  `;

  const { data } = useQuery(siteDataQuery)

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
        {JSON.stringify(data)}

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
  )
}

export default withVulcan({ ssr: true, graphqlUrl })(Home)
