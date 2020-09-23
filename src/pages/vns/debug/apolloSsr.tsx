import { useQuery /*, useMutation*/ } from "@apollo/client";
import gql from "graphql-tag";
import { withApollo } from "@vulcanjs/next-apollo";

const SsrDebugPage = () => {
  const mortyQuery = gql`
    query {
      character(id: 2) {
        name
      }
    }
  `;
  /*
  const vulcanRepoInfo = gql`
    query vnsInfo($name: String!, $owner: String!) {
      repository(name: $name, owner: $owner) {
        nameWithOwner
      }
    }
  `;
  const vulcanSiteDataQuery = gql`
    query getSiteData {
      siteData {
        url
        title
        sourceVersion
        logoUrl
      }
    }
  `;
  */

  const { data, loading, error } = useQuery(mortyQuery); //vulcanRepoInfo); //vulcanSiteDataQuery);

  let content = "";
  if (loading) {
    content = "loading";
  } else if (error) {
    content = "error"; // NOTE: when encountering a fatal error in "getDataFromTree", app will be rendered in loading state instead
  } else if (data) {
    content = "data";
  }
  return <div>{content}</div>;
};

// @see https://github.com/APIs-guru/graphql-apis
// @see https://rickandmortyapi.com/documentation/#graphql
const graphqlUri = "https://rickandmortyapi.com/graphql";
export default withApollo(SsrDebugPage, { graphqlUri });
//export default SsrDebugPage;
