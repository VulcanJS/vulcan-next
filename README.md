
# Prepare the migration from Meteor to Next

## What will stay the same

- Features revolving around the Vulcan schema
- The GraphQL API, the graphQL schema generator
- Using Mongo as a default
- Using React, Storybook, Cypress, Jest

## Group "extension functions" at the index level of the package

### Explanation

The JavaScript ecosystem is converging toward a more static approach. It means that we gradually replace "runtime" patterns by "buidtime" pattern, when that makes sense.

For example: `addResolver` will register a new GraphQL resolver. Then, during app startup, we use this resolver to init our Apollo server. 

In the future, instead, we will expect the user to export the resolver, using a traditional ES6 import: it means that we will be able to know all resolvers at runtime, even before the app startup (better perfs, better code management etc.).

Eg `export default { resolvers: [ myResolver1, myResolver2], components: [MySuperComponent, MyOtherComponet]}`

### Rule

Move `addRoute`, `registerFragment`, `createCollection`, `replaceComponent` calls in your package `client/main.js`, `server/main.js` or `modules/main.js`.

In other files, only use ES6 import/export to pass around configurations, components, resolvers etc.

## Do not hesitate to "eject" from SmartForm, DataTable and Card

### Explanation

Vulcan core components are extremely powerful when it comes to automatically generate UI components based on a schema.

Their limitation is the lack of flexibility : what if you want to add a specific field in a specific form, that was not previously included in your schema? Something as simple as an helper message? Or define input groups on the fly.

The best tradeoff might come from using Hooks. See experiments such as [react-table](<https://github.com/tannerlinsley/react-table>) or [react-hook-form](<https://react-hook-form.com/>). In the future, Vulcan will still provide you a set of default, smart components. But also more tools to help you creating your own custom components: iterating intuitively on schema fields, managing the state for a precise field, etc. when your need grows out of those smart compoments.

### Alternative

When you schema is more mature, you may write fully custom components to display data, relying on Vulcan's data fetching hooks (`useMulti`) and helpers we will develop in the future.

This is ok, because your schema is probably more stable at this point.

Investigate Hook based solutions such as [react-table](<https://github.com/tannerlinsley/react-table>) or [react-hook-form](<https://react-hook-form.com/>)

## Avoid `registerComponent`

### Explanation

Component registration is a pattern meant at helping us to easily tweak an existing component. For example, that's how we are able to support both Bootstrap and Material UI.

However, this pattern only makes sense at the framework level, when you expect other developers to customize your components.

It does not make sense within the same company for instance, where you should have only one canonical implementation of a component.

You should never need `registerComponent` in your own, private code.

### Alternative

Use usual ES6 import/export as you would do in any app.

## Avoid dependencies to Meteor atmosphere packages and Meteor functions

This is especially true in the frontend, where you don't want to have Meteor around to keep compatibility with the traditional JS ecosystem.

In Vulcan, we are almost done removing all these dependencies in the frontend. The last one left is the user account system client-side, and we are technically able to remove it.

### Alternative

Use NPM alternatives. Avoid Meteor functions.

If you truly feel like you need to use Meteor methods or pub/sub sytem, assess whether you really need Vulcan and Apollo GraphQL

### Learn TypeScript

TypeScript will not be mandatory in Vulcan. But the core code will written in TypeScript, and honestly, it's a life changer compared to vanilla JavaScript.

So it might be worth learning it as soon as possible, the benefits for you as a dev are tremendous.

# --- Default Next doc
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

In another terminal, run a Vulcan application on `localhost:3001`:

```bash
cd SomeVulcanApp
meteor run --settings settings.json --port 3001
```

In another terminal, run the Next development server:

```bash
GRAPHQL_URL="your-vulcan-server-url" npm run dev
# or
GRAPHQL_URL="your-vulcan-server-url" yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Other projects using Next and Apollo

- [Official Apollo example](https://github.com/zeit/next.js/tree/canary/examples/with-apollo)
- [Next react Graphql Apollo Bootstrap](https://github.com/Sebastp/Next-react-graphql-apollo_Boostrap)
