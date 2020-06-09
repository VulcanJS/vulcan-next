// lib/withApollo.js
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from "./apolloClient"
// import { NextPageContext } from 'next';
import {
    NormalizedCacheObject
} from "@apollo/client";

export default ({ graphqlUri }) => withApollo<NormalizedCacheObject>(
    // TODO: next-with-apollo still use apollo-client v2 typings, we need to wait for v3 update (@apollo/client)
    // @ts-ignore 
    ({ initialState, ctx }) => {
        return createApolloClient(graphqlUri, initialState, ctx)
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo} >
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);