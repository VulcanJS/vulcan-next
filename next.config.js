// @see https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        // mySecret: 'secret',
        // secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
        // /!\ Will be available on both server and client using "getConfig"
        // someEnvironmentRelatedPublicValue: process.env.WHATEVER,
        // someStaticPublicValue: "hello-world"
    },
    // /!\ Will be available on both server and client using "process.env.<your-variable>"
    // (usage is very similar to publicRuntimeConfig)
    env: {
        GRAPHQL_URL: process.env.GRAPHQL_URL || "http://localhost:3001/graphql"
        // staticVariable: "some-static value"
    }
}