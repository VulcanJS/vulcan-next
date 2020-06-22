import { useQuery /*, useMutation*/ } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Home from "~/components/home";
//import { useForm } from "react-hook-form";
import { withApollo } from "@vulcan/next-apollo";
import MDXMuiLayout from "~/components/layout/MDXMuiLayout";

const HomePage = () => {
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
  return (
    <MDXMuiLayout>
      <main>
        <Home />
        {content}
      </main>
    </MDXMuiLayout>
  );
};

// export default withApollo({ graphqlUri })(MyApp, { getDataFromTree });

export default withApollo(HomePage);
