/**
 * Demo queries to a legacy Vulcan Meteor backend
 */
import { useQuery /*, useMutation*/ } from "@apollo/client";
import gql from "graphql-tag";

const VulcanMeteorDemo = () => {
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
  return content;
};

export default VulcanMeteorDemo;
