import { useQuery /*, useMutation*/ } from "@apollo/client";
import gql from "graphql-tag";
//import { useForm } from "react-hook-form";

const SsrDebugPage = () => {
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

  let content = "";
  if (loading) {
    content = "loading"; // on ${client.name}`
  } else if (error) {
    content = "error"
  } else if (data) {
    content = "data"
  }
  return (
    <div>
      {content}
    </div>
  );
};

export default SsrDebugPage;
