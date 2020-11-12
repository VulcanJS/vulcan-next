import { useQuery /*, useMutation*/ } from "@apollo/client";
import gql from "graphql-tag";
import {
  initializeApollo,
  createApolloClient,
  rehydrateApolloInitialState,
} from "@vulcanjs/next-apollo";

// @see https://github.com/APIs-guru/graphql-apis
// @see https://rickandmortyapi.com/documentation/#graphql
const graphqlUri = "https://rickandmortyapi.com/graphql";
const MORTY_QUERY = gql`
  query {
    character(id: 2) {
      name
    }
  }
`;
const SsrDebugPage = ({ initialApolloState }) => {
  // Create a new Apollo client and rehydrate
  const client = createApolloClient({ graphqlUri });
  rehydrateApolloInitialState(client, initialApolloState);
  const { data, loading, error } = useQuery(MORTY_QUERY, {
    client, // change the apollo client on the fly
  });

  let content = "";
  if (loading) {
    content = "loading";
  } else if (error) {
    content = "error"; // NOTE: when encountering a fatal error in "getDataFromTree", app will be rendered in loading state instead
  } else if (data) {
    content = `data: ${JSON.stringify(data)}`;
  }
  return <div>{content}</div>;
};
export async function getStaticProps() {
  const apolloClient = initializeApollo(null, { graphqlUri });

  await apolloClient.query({
    query: MORTY_QUERY,
  });

  return {
    props: {
      // Will allow to rehydrate the cache client side
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default SsrDebugPage;
//export default SsrDebugPage;
