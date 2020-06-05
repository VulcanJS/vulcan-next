## Features from Next

## TypeScript

### TS config

[Relevant Next doc](https://nextjs.org/docs/basic-features/typescript)

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

## Jest for unit testing

## TODO

Cleaner debug call (active only when DEBUG=1)

i18n

Pure JS support (no TS), in cypress, in code, in storybook, in jest...



PErformance testing?

Material UI

Jest for the custom server
Jest for the code

Storybook
Webpack bundle analysis
Webpack bundle analysis for Storybook
MDX support
Prettier config
Doc for the perfect VS Code setup
TypeScript
TypeScript/Eslint security rules
Code coverage Jest
Code coverage Cypress
Unified code coverage
Error boundary
Redirection demo
Up to data apollo
Debug routes
Included docs, not bundled at build time
Select pages bundled at build time?
React testing
React testing + Cypress
Graphql
TypeScript for dynamic component
Error tracking with Sentry
ES6 webpack config?
Reproduction of various small issues
Storybook serve public folder

Mock of next packages from storybook, in jest

Efficient plug to Vulcan
Vulcan package standard

custm sever

Fullstack cypress testing of the custom server