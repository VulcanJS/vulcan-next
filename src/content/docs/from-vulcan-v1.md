# Prepare the migration from Vulcan 1 (Meteor) to Vulcan 2 (Next+NPM)

## Connect to an existing Vulcan Meteor backend

If you already own a Vulcan Meteor app, you can use Vulcan Next today as a frontend solution.

In another terminal, run your Vulcan Meteor application on `localhost:3001`:

```bash
cd SomeVulcanApp
meteor run --settings settings.json --port 3001
```

Run Vulcan Next development server:

```bash
# We favour Yarn over NPM for commands
NEXT_PUBLIC_GRAPHQL_URI="your-vulcan-server-url" yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Update your Vulcan Meteor backend to match Vulcan Next architecture

In the long run, Vulcan Next will be considered as the standard and Vulcan Meteor as a legacy version.
To make the migration easier, you can refactor your Vulcan Meteor application to progressively match the new architecture.

Even if you don't plan to use Vulcan Next at all, this refactoring will make your application more scalable.

## What will stay the same

- Features revolving around the Vulcan schema
- The GraphQL API, the graphQL schema generator
- Using Mongo as a default
- Using React, Storybook, Cypress, Jest
- ...whatever can stay the same

## Group "extension functions" at the index level of the package

### Explanation

The JavaScript ecosystem is converging toward a more static approach. It means that we gradually replace "runtime" patterns by "buidtime" pattern, when that makes sense.

For example: `addResolver` will register a new GraphQL resolver. Then, during app startup, we use this resolver to init our Apollo server.

In the future, instead, we will expect the user to export the resolver, using a traditional ES6 import: it means that we will be able to know all resolvers at runtime, even before the app startup (better perfs, better code management etc.).

Eg `export default { resolvers: [ myResolver1, myResolver2], components: [MySuperComponent, MyOtherComponet]}`

### Rule

Move `addRoute`, `registerFragment`, `createCollection`, `replaceComponent` calls in your package `client/main.js`, `server/main.js` or `modules/main.js`.

In other files, only use ES6 import/export to pass around configurations, components, resolvers etc.

## Do not hesitate to "eject" from SmartForm, DataTable and Card (or accept their limitations)

### Explanation

Vulcan core components are extremely powerful when it comes to automatically generate UI components based on a schema.

Their limitation is the lack of flexibility : what if you want to add a specific field in a specific form, that was not previously included in your schema? Something as simple as an helper message? Or define input groups on the fly.

The best tradeoff might come from using Hooks. See experiments such as [react-table](https://github.com/tannerlinsley/react-table) or [react-hook-form](https://react-hook-form.com/). In the future, Vulcan will still provide you a set of default, smart components. But also more tools to help you creating your own custom components: iterating intuitively on schema fields, managing the state for a precise field, etc. when your need grows out of those smart compoments.

### Alternative

When you schema is more mature, you may write fully custom components to display data, relying on Vulcan's data fetching hooks (`useMulti`) and helpers we will develop in the future.

This is ok to use "non-declarative" patterns, because your schema is probably more stable at this point so you know how your data is structured.

Investigate Hook based solutions such as [react-table](https://github.com/tannerlinsley/react-table) or [react-hook-form](https://react-hook-form.com/)

## Avoid `registerComponent`

### Explanation

Component registration is a pattern meant at helping us to easily tweak an existing component. For example, that's how we are able to support both Bootstrap and Material UI.

However, this pattern only makes sense at the framework level, when you expect other developers to customize your components.

It does not make sense within the same company for instance, where you should have only one canonical implementation of a component.

You should never need `registerComponent` in your own, private code. However `replaceComponent` is fine if you want to tweak 3rd party Vulcan components.

### Alternative

Use usual ES6 import/export as you would do in any app.

## Avoid dependencies to Meteor atmosphere packages and Meteor functions

This is especially true in the frontend, where you don't want to have Meteor around to keep compatibility with the traditional JS ecosystem.

In Vulcan, we are almost done removing all these dependencies in the frontend. The last one left is the user account system client-side, and we are technically able to remove it.

Note: you are still encouraged to use Vulcan packages from Atmosphere, that do not themselves rely too much on Meteor. Good example: [vulcan-crisp](https://github.com/Apollinaire/vulcan-crisp)

### Alternative

Use NPM alternatives. Avoid Meteor functions.

If you truly feel like you need to use Meteor methods or pub/sub sytem, assess whether you really need Vulcan and Apollo GraphQL

## Learn TypeScript

TypeScript will not be mandatory in Vulcan. But the core code will written in TypeScript, and honestly, it's a life changer compared to vanilla JavaScript.

So it might be worth learning it as soon as possible, the benefits for you as a dev are tremendous.

## Learn Next and Express, be able to create REST endpoint

Of course, learning Next will be useful.

You can also investigate Express, as a solution to define your `apiRoutes`. Next tends to push its in house solution `micro`, but we will prefer a more standard solution like Next in Vulcan.

In Meteor, you can already define REST endpoints outside Vulcan's graphQL system using `meteor/webapp`. Actually, that's how Apollo Server is setup in Vulcan.

Also, a nice doc to connect to MongoDB in Next:
https://developer.mongodb.com/how-to/nextjs-building-modern-applications

## Assess whether you need Meteor, Vulcan Meteor, or Vulcan Next

- Reason to use Meteor: gaining traction again after being bought by Tiny in late 2019. Mature, robust, productivity focused framework. Easy to learn.
- Reason to use Vulcan Meteor (v1): GraphQL is more suited for multi-clients communication (having a mobile app, a web app not based on Meteor etc. communicating with the backend). Plus the ton of productivity oriented features. Can still use existing Meteor packages. Can allow a smoother transition toward the rest of the JS ecosystem if you come from Meteor.
- Reason to use Vulcan Next (v2): Next is extremely versatile and infinitely more scalable than Meteor. Vulcan provides the missing parts to build fullstack app with high productivity. Closer to the usual JS ecosystem. JAMStack ready, but also fullstack ready.

- Reason NOT to use Meteor: poor performances, ecosystem lock-in
- Reason NOT to use Vulcan Meteor: if you want to use Meteor core features. Vulcan mostly relies on Apollo GraphQL at this point.
- Reason NOT to use Vulcan Next: most complex approach of the 3. Can't use Meteor features at all.
