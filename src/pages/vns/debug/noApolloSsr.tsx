import { useQuery /*, useMutation*/ } from "@apollo/client";
import { createApolloClient } from "@vulcanjs/next-apollo";
import gql from "graphql-tag";

const graphqlUri = "https://rickandmortyapi.com/graphql";
const client = createApolloClient({ graphqlUri });
// Create a new Apollo client and rehydrate
const mortyQuery = gql`
  query {
    character(id: 2) {
      name
    }
  }
`;
const NoSsrDebugPage = () => {
  console.log("rendering");

  const { data, loading, error } = useQuery(mortyQuery, { client }); //vulcanRepoInfo); //vulcanSiteDataQuery);

  let content = "";
  if (loading) {
    content = "loading";
  } else if (error) {
    content = "error";
  } else if (data) {
    content = "data";
  }
  return <div>{content}</div>;
};

// @see https://github.com/APIs-guru/graphql-apis
// @see https://rickandmortyapi.com/documentation/#graphql
export default NoSsrDebugPage; // SSR is not activated
