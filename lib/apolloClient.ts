import fetch from 'node-fetch'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'

const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URL,
    fetch: fetch,
    credentials: 'same-origin',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )

    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = ApolloLink.from([errorLink, httpLink])
const cache = new InMemoryCache()

const apollo = new ApolloClient({
    ssrMode: true,
    link,
    cache,
})

export default apollo