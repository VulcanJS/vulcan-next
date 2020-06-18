# Features

## TypeScript

### TS config

[Relevant Next doc](https://nextjs.org/docs/basic-features/typescript)

## Apollo

### Optional, per-page Apollo Provider and SSR

We extend [`next-with-apollo`](https://github.com/lfades/next-with-apollo) with a simpler API. Apollo SSR is enabled page per page, for a granular optimization.

```js
withApollo(MyPage) // add ApolloProvider with the default apollo client, but no SSR
withApollo(MyPage, {ssr: true}) // will fetch data during server-side render automatically
MyPage // no SSR, no Apollo Provider
```

With have a non-regression test for SSR, so no surprise with component that suddenly appear in loading state.

### NOT Apollo v3/4

We currently use Apollo Client v2. At the time of writing, v3 is still in beta.

## Code architecture and build

### Code in `src`

All your code should go into the `/src` directory ([doc](https://nextjs.org/docs/advanced-features/src-directory)).

This folder structure is officially supported by Next. It is relevant when you have a lot of development tooling alongside your actual codebase, like we do in Vulcan.

### Package-oriented architecture

The structure of a plugin system of Next is still [under discussion](https://github.com/vercel/next.js/discussions/9133). In the meantime, we strive to provide code as clean as possible, structured in package, so you can easily remove prebundled features.

To do so, we currently use a Webpack config so folders in `packages/@vulcan` can be imported the same way as `node_modules`. `packages/@vulcan/core` can be imported as `import "@vulcan/core"`.
You can reproduce the same behaviour with any other prefix by changing `tsconfig.common.json`

You are not forced to structure your own code as packages though.

### Magic src imports with `~`

Import code in `src` from anywhere by writing `import "~/components/foobar"`.

Relative imports are a huge mess to support. A relative import should never go further than the category it belongs too: `pages` should never have to import `components` using a messy `../../../components/myComponent`.

### Quasi-imorphism

We allow folders and packages to contain an `index.client` or `index.server` file, that will be used at build time depending on the environment.
/!\ You still need to have a bare `index` file alongside those environment specific file. Otherwise TypeScript will complain (see the "Failures and learnings" documentation for more details).

### Env variables in .env

We demo Next.js 9.4 new feature, `.env` file support. Open `.env.development` to see the default development variables.

[Official doc.](https://nextjs.org/docs/basic-features/environment-variables)

### Auto-changelog

Run `yarn auto-changelog` to compute a new changelog. Works best in combination with `yarn version` (to create git version tags automatically) and `git merge --no-ff your-feature` (to get merge commits).

## Internationalization (i18n)

### i18n without custom server

We use next-i18next new serverless version (beta), as demoed in [this repo](https://github.com/borispoehland/next-i18next-boilerplate.git) from [borispoehland](https://github.com/borispoehland).

IMPORTANT NOTE: [there is one last blocking issue with serverless deployment on Vercel](https://github.com/vercel/next.js/issues/13624). To put it in a nutshell prevents your locale JSON to be deployed alongside your pages. 

More broadly, it is related to the impossibility of [reading static files in Next when deployed to Vercel](https://github.com/vercel/next.js/issues/8251) at the moment.

### Lang in the custom _document

`lang` attribute is set automatically on `<html>` during server-render

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

Code coverage is totally disabled client-side when simply running tests, using ["CYPRESS_coverage" variable](https://github.com/cypress-io/code-coverage#disable-plugin) (thanks @bahmutov for enhancing the doc on this point)

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

We have preinstalled `react-hooks`

### Tests for Vulcan Next Starter (for contributors only)

We have a unit tests for some key features and scripts of VNS, through the `tests/vns` folder. 

This folder is ignored when running `yarn run test:unit`, to avoid bloating your own tests.

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

Note: CSS modules are currently not appearing correctly in Storybook, see https://github.com/VulcanJS/vulcan-next-starter/issues/20

### Public folder

Storybook is aware of the `public` folder, so it will display images accordingly.

### Webpack bundle analyzer

There is nothing worse than a slow Storybook build, you can debug your Webpack bundle using `yarn run analyze-bundle:storybook`

## Debugging

### Webpack bundle analyzer

Run `yarn run analyze-bundle` to get insight on your Webpack build.

## Material UI

Initial setup based on [official Next example](https://github.com/mui-org/material-ui/tree/master/examples/nextjs).

We try to reduce the foot print of Material UI for an easy remove. In next iterations, we'll try to make it fully pluggable, like in Vulcan Meteor, so you can easily swap your UI system.



## TODO

### i18n

Custom error page (with i18n name space to remove warning)

Automated translation extraction: https://react.i18next.com/guides/extracting-translations

### Material UI

Material UI

 ### Others

Error boundary
NPM package.json version in custom document
Switch between MUI and Tailwind
MUI and i18n in Storybook
Redirection demo for private pages => demo a page that is not available for example, and redirect to home with an HTTP request
Graphql code generator
Remove debug routes from bundle
Document contribution process
Cleaner debug call (active only when DEBUG=1)
Storybook static build
Pure JS support (no TS), in cypress, in code, in storybook, in jest...
PErformance testing?
Jest for the custom server
Unified code coverage with server
A way to debug which files are built in TypeScript
MDX support
Prettier config
Doc for the perfect VS Code setup
TypeScript/Eslint security rules
Included docs, not bundled at build time
Select pages bundled at build time?
TypeScript for dynamic component
Error tracking with Sentry
USe ES6 in webpack configs (see electron-react-boilerplate for a demo)
Reproduction of various small issues
Mock of next packages from storybook, in jest
Efficient plug to Vulcan
Vulcan package standard
Custom SSR server? to be avoided if possible
Fullstack cypress testing/coverage of the custom server
Write Storybook stories for full pages?