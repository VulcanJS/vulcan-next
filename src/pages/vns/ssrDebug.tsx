import { useQuery /*, useMutation*/ } from "@apollo/react-hooks";
import gql from "graphql-tag";
//import { useForm } from "react-hook-form";

const SsrDebugPage = () => {
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

export default SsrDebugPage;
