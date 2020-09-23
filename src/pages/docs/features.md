# Features

## TypeScript

[Relevant Next doc](https://nextjs.org/docs/basic-features/typescript)

We use TypeScript extensively, and try to enable it wherever possible (sources, Jest, Cypress, Storybook...)

## Apollo Client for GraphQL API consumption

### Optional, per-page Apollo Provider and SSR

We extend [`next-with-apollo`](https://github.com/lfades/next-with-apollo) with a simpler API. Apollo SSR is enabled page per page, for a granular optimization.

```js
withApollo(MyPage); // add ApolloProvider with the default apollo client, but no SSR
withApollo(MyPage, { ssr: true }); // will fetch data during server-side render automatically
MyPage; // no SSR, no Apollo Provider
```

With have a non-regression test for SSR, so no surprise with component that suddenly appear in loading state.

### Pass cookies to Apollo client during server render

### NOT Apollo v3/4

We currently use Apollo Client v2. At the time of writing, v3 is still in beta.

## Authentication

### Demonstration of redirection

See `src/pages/vns/debug/private`. You can use `withPrivateAccess` HOC to make a page private and handle redirections correctly in all situations (server-side, client-side, in the context of a static export etc.).

## Apollo Server

### Demo of a simple server

See `src/pages/api/graphql` for a demo server built with Apollo and Express

**NOTE:** Expect drastic enhancement of the way the server is set up, thanks to [VulcanJS](http://vulcanjs.org/) declarative approach.

### GraphQL Playground

GraphQL Playground is available on `api/graphql`. All API routes of Next are located in the `src/pages/api` folder, hence the `api` prefix.

### Graphql Voyager

Open `api/debug/graphql-voyager` and explore your API visually.

## MongoDB

### Lambda safe connection

Relevant docs:

[Official tutorial without mongoose](https://developer.mongodb.com/how-to/nextjs-building-modern-applications)

[Best practice for Mongo in AWS Lambda](https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/)

### Mongoose for schema-based modeling

### Conversion between GraphQL ID and Mongoose ID types

[See relevant issue](https://github.com/apollographql/apollo-server/issues/1633)

## Code architecture and build

### Code in `src`

All your code should go into the `/src` directory ([doc](https://nextjs.org/docs/advanced-features/src-directory)).

This folder structure is officially supported by Next. It is relevant when you have a lot of development tooling alongside your actual codebase, like we do in Vulcan.

### Package-oriented architecture

The structure of a plugin system of Next is still [under discussion](https://github.com/vercel/next.js/discussions/9133). In the meantime, we strive to provide code as clean as possible, structured in package, so you can easily remove prebundled features.

To do so, we currently use a Webpack config so folders in `packages/@vulcanjs` can be imported the same way as `node_modules`. For instance, `packages/@vulcanjs/next-utils` can be imported as `import "@vulcanjs/next-utils"` in your code.
You can reproduce the same behaviour with any other prefix by changing `tsconfig.common.json`

However, you are **not** forced to structure your own code as packages.

### Magic src imports with `~`

Import code in `src` from anywhere by writing `import "~/components/foobar"`.

Relative imports are a huge mess to support. A relative import should never go further than the category it belongs too: `pages` should never have to import `components` using a messy `../../../components/myComponent`.

### Quasi-imorphism

We allow folders and packages to contain an `index.client` or `index.server` file, that will be used at build time depending on the environment.
/!\ You still need to have a bare `index` file alongside those environment specific file. Otherwise TypeScript will complain (see the "Learnings" documentation for more details).

#### Env variables in .env

We demo Next.js 9.4 new feature, `.env` file support. Open `.env.development` to see the default development variables.

[Official doc.](https://nextjs.org/docs/basic-features/environment-variables)

## Various

### Passing package.json info to the client app

In `next.config.js`, you'll find a demonstration of how to **safely** inject informations from your `package.json` into your Next application.

For example, we use it to inject current version into the `html` tag for better deployment tracking.

### Performance debugging

[See official doc](https://nextjs.org/docs/advanced-features/measuring-performance).

`DEBUG=vns:perf npm run dev`

### Auto-changelog

Run `yarn auto-changelog` to compute a new changelog. Works best in combination with `yarn version` (to create git version tags automatically) and `git merge --no-ff your-feature` (to get merge commits).

### Design system best practices

Based on [Emma Bostian's course on Frontend Masters](https://frontendmasters.com/courses/design-systems), we include basic examples and libraries to get you started writing a design system for your UI. This means:

- An example of a styled button, with Material UI and Styled Components
- A modal example
- Animations with react-spring
- A powerful Storybook configuration

See `src/components/ui` for the code, and run Storybook to see the demos.

No more excuses to make dull UIs, you have all the tools you need :)

## Serverless internationalization

### i18n without custom server

We use next-i18next new serverless version (beta), as demoed in [this repo](https://github.com/borispoehland/next-i18next-boilerplate.git) from [@borispoehland](https://github.com/borispoehland).

IMPORTANT NOTE: [there is one last blocking issue with serverless deployment on Vercel](https://github.com/vercel/next.js/issues/13624). To put it in a nutshell prevents your locale JSON to be deployed alongside your pages.

More broadly, it is related to the impossibility of [reading static files in Next when deployed to Vercel](https://github.com/vercel/next.js/issues/8251) at the moment.

### Lang in the custom \_document

`lang` attribute is set automatically on `<html>` during server-render

## MDX support

Get started by reading [MDXJS official doc](https://mdxjs.com/). If you want to write a blog with fancy interactive blocks, you'll fall in love with this feature.

### Next-mdx-enhanced

Thanks to [next-mdx-enhanced](https://github.com/hashicorp/next-mdx-enhanced), you can easily use markdown files as your CMS.
Check the `/docs` page when running the app to see the live documentation.

### MD and MDX import in React

### Loading MD/MDX in Storybook

Work out of the box. Will however disable default behaviour for ".md" import of Storybook, which is replaced by MDX behaviour.

## Cypress for e2e testing

### TypeScript and vanilla JS (+ESLint)

### Custom commands, with TypeScript

[Relevant doc](https://docs.cypress.io/guides/tooling/typescript-support.html#Types-for-custom-commands)

You can write JavaScript tests and still enjoy auto-completion of custom commands, thanks to TS [triple slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).

### Reuse app Webpack config

You may want your Cypress code to be as powerful as your app code. For this, we are enhancing the Cypress webpack config with the same features as in the app.

[Example from Cypress with TS + Webpack](https://github.com/cypress-io/cypress-webpack-preprocessor/tree/master/examples/use-ts-loader)

### Code coverage

See [Cypress Code Coverage example for TS](https://github.com/cypress-io/code-coverage/tree/master/examples/ts-example), [Cypress Next example](https://github.com/bahmutov/next-and-cypress-example), [Cypress TS example](https://github.com/lluia/cypress-typescript-coverage-example)...

Note: [doc of NYC for TS](https://www.npmjs.com/package/@istanbuljs/nyc-config-typescript) has to be followed carefully (computing sourceMaps for TS code, installing all sibling packages...). The difficult part is instrumentation.

Code coverage is totally disabled client-side when simply running tests, using ["CYPRESS_coverage" variable](https://github.com/cypress-io/code-coverage#disable-plugin) (thanks [@bahmutov](https://github.com/bahmutov)).

### No screenshot/videos as a default

For some reason, Cypress:run will automatically store videos of test run. We disabled this behavior in the config as it may bloat CI/CD.

### Import from your code

We use [Cypress Webpack Preprocessor](https://github.com/cypress-io/cypress-webpack-preprocessor), to enhance Cypress build with similar options as the actual app.

We use `ts-loader`, with [`transpileOnly`](https://github.com/TypeStrong/ts-loader#transpileonly) option to fasten build. We expect your e2e tests typing to be correct at run time.

### Pure SSR testing

The `cy.visitAsHtml()` command allow to check the pure HTML render of a page. It will disable JS in the the page automatically.

Note: at the time of writing (2020/06) [there is an open issue when needing this command in multiple tests](https://github.com/VulcanJS/vulcan-next-starter/issues/40)

## Jest for unit testing

### React Testing library

We have preinstalled [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and [React Testing Hooks](https://github.com/testing-library/react-hooks-testing-library).

### Tests for Vulcan Next (for contributors only)

We have a unit tests for some key features and scripts of VNS, through the `tests/vns` folder.

This folder is ignored when running `yarn run test:unit`, to avoid bloating your own tests.

### MDX parsing, magic imports with ~

[jest-transformer-mdx](https://github.com/bitttttten/jest-transformer-mdx) allow importing .mdx also in Jest

## Unified testing patterns

We strive to unify testing patterns between Cypress and Jest where it makes sense.

First, add [React Testing queries into Cypress](https://github.com/testing-library/cypress-testing-library), so you can fetch elements with similar patterns. Check [React Testing docs for example of the reverse approach ](https://testing-library.com/docs/react-testing-library/setup#add-custom-queries) (data-cy in React Testing).

### Unified test coverage

We followed awesome [recommandations from Bahmutov](https://github.com/bahmutov/cypress-and-jest) to unify Cypress and Jest coverage. This is crucial to have a clearer vision of what is correctly tested in your application, whatever the test method is. For instance, e2e tests provides a huge coverage for React components, while unit tests are more efficient for helpers, hooks and functions.

`yarn run coverage` will run tests and compute the unified report in `coverage`.

`yarn run reports:combined` will compute the combined report without running tests.

[More insights with Cypress](https://glebbahmutov.com/blog/combined-end-to-end-and-unit-test-coverage/)

## Storybook

### Same import as in Next

We reuse our Webpack config extension function, so you can enjoy magic imports and isomorphic imports in Storybook too.

### Styling with Styled JSX and CSS Modules

Note: CSS modules are currently not appearing correctly in Storybook, see [vulcan-next-starter/issues/20](https://github.com/VulcanJS/vulcan-next-starter/issues/20)

### Public folder

Storybook is aware of the `public` folder, so it will display images accordingly.

### I18n

We reuse the same i18n config as in the app, so your stories will be internationalized automatically.

### Webpack bundle analyzer

There is nothing worse than a slow Storybook build, you can debug your Webpack bundle using `yarn run analyze-bundle:storybook`

### Mock packages

See `.storybook/mocks/packages` and `.storybook/main.js`, we use Webpack alias to load them. Thus, you can use components that rely on `next/router` and `next/config` for instance.

## Debugging

### Webpack bundle analyzer

Run `yarn run analyze-bundle` to get insight on your Webpack build.

## Styling

### Polished

We include [Polished](https://polished.js.org/), a kind of Lodash for styling supported by the Styled Components community.

### Alternative 1: Material UI and Styled Components

Initial setup based on [official Next example](https://github.com/mui-org/material-ui/tree/master/examples/nextjs).

We try to reduce the footprint of Material UI for an easy remove. In next iterations, we'll try to make it fully pluggable, like in Vulcan Meteor, so you can easily swap your UI system.

We also include Styled Components. Why not using CSS-in-JS solution of Material UI? [Read this issue to get answers.](https://github.com/VulcanJS/vulcan-next-starter/issues/53)

We will also try to make Styled Components easier to remove in future updates.

#### Styled Components Modifiers

We demo [Styled Components Modifiers](https://github.com/Decisiv/styled-components-modifiers), a powerful way to add modifiers props on your elements (options like "large", "warning", "dark"...).

### Theme switch demo

We demo a theme switch button, using React context. See `lib/providers` for sources and sample Storybook stories.

### Alternative 2: Styled-jsx and PostCSS (+ your CSS framework of choice)

[Styled-jsx is the builtin styling solution of Next](https://nextjs.org/docs/basic-features/built-in-css-support).

#### PostCSS for easier override using Next

In VNS, we favour out-of-the-box solutions from Next to style the app, so basically [styled-jsx](https://github.com/vercel/styled-jsx) and CSS modules.
However, [usage with Material UI and more broadly override of child components is not very elegant.](https://github.com/vercel/styled-jsx/issues/142)
We include PostCSS with the "nesting" plugin to allow a cleaner syntax.

## Deployment

### Dockerfile for production

See `build:docker` command.

### Dockerfile for Cypress

Running Cypress in Docker makes it easier to run your tests locally, while you keep coding.
You can also use this file for your CI/CD process.

### 3rd party tooling as optional dependencies

As a default, Jest, Cypress, Storybook and any other 3rd party tooling is installed as optional dependencies.

- "dependencies" is what your app need to run
- "devDependencies" is what your app need to be built
- "optionalDependencies" is everything else

Package.json naming convention are not intuitive and do not allow for a clean, environment-based distinction between packages. So that's the best we could do!

## NOT YET IMPLEMENTED:

### Storybook

Demo a story for a full page

### I18n

Add custom error page with i18n name space to remove warning
Automated translation extraction: https://react.i18next.com/guides/extracting-translations
Remove annoying warnings when getInitialProps is not set

### Material UI and friends

Easy switch between MUI, Bootstrap, and probably Tailwind, Styled Components, Emotion...

### Error and logs

Global \_app error boundary
Sentry demo
Setup debug client side programmatically based on DEBUG environment variable

### Cypress

Splitting tests in folders? In order to differentiate real e2e tests from integration testing

### Jest

Load .env development config automatically in Jest

### GraphQL

Graphql code generator for better autocompletion
Demo support of multiple graphQL API using Link split

### Demo custom server for SSR?

NOTE: Using a custom server to serve Next pages is not recommended. We may choose not to support this feature.

ts-node, nodemon to have hot reload
Jest for the custom server
Fullstack cypress testing/coverage of the custom server

### Next

Remove debug routes from bundle during build

### Others

Pure JS support (no TS), in cypress, in code, in storybook, in jest...
Performance testing?
A way to debug which files are transpiled by TypeScript/included in the build
Easy opt out of MDX
Easy opt out of i18n
Prettier config
Doc for the perfect VS Code setup
TypeScript/Eslint security rules
Demo TypeScript for dynamic component (Plotly for instance, Leaflet etc.)
USe ES6 in webpack configs, next.config (see electron-react-boilerplate for a demo)
Mock of next packages from storybook, in jest
Efficient plug to Vulcan
VS code debugging
SSR disabling
