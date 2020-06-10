// lib/withApollo.js
import withApollo from "next-with-apollo";
import createApolloClient from "./apolloClient";
// import { NextPageContext } from 'next';
//import {
//    ApolloProvider,
//    NormalizedCacheObject
//} from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export default ({ graphqlUri }) =>
  withApollo<NormalizedCacheObject>(
    ({ initialState, ctx }) => {
      return createApolloClient(graphqlUri, initialState, ctx);
    },
    {
      render: ({ Page, props }) => {
        return (
          <ApolloProvider client={props.apollo}>
            <Page {...props} />
          </ApolloProvider>
        );
      },
    }
  );
