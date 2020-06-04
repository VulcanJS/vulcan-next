import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    users() {
      return [{ name: 'Vulcanjs' }]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production'
    ? {
      settings: {
        'request.credentials': 'include'
      }
    }
    : false,
})

const app = express()

app.set('trust proxy', true)

server.applyMiddleware({ app, path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  }
}

export default app
