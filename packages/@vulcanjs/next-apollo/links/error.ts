import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";

const locationsToStr = (locations: GraphQLError["locations"] = []) =>
  locations.map(({ column, line }) => `line ${line}, col ${column}`).join(";");

const errorLink = onError((error) => {
  const { graphQLErrors, networkError } = error;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locationsToStr(
          locations
        )}, Path: ${path}`
      );
    });
  if (networkError) {
    // eslint-disable-next-line no-console
    console.log(`[Network error]: ${networkError}`);
  }
});

export default errorLink;
