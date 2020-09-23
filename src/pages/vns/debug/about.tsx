import "@vulcanjs/demo";

const IS_PROD = process.env.NODE_ENV === "production";

const rootUrl = IS_PROD ? process.env.ROOT_URL : "http://localhost:3000";

const graphqlUrl = IS_PROD
  ? process.env.GRAPHQL_URL
  : "http://localhost:3001/graphql";

const About = () => (
  <div>
    <h1>vulcan-next-starter</h1>
    <p>IS_PROD: {JSON.stringify(IS_PROD)}</p>
    <p>rootUrl: {rootUrl}</p>
    <p>graphqlUrl: {graphqlUrl}</p>
  </div>
);

export default About;
