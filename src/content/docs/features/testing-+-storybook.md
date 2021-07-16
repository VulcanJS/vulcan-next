# Testing

## Jest for unit testing

### Supporting server-only tests

We support server and client testing based on the following naming convention:

- A test named `myTest.test.ts` will be executed in a JSDOM environment (~ like a browser). Use as a default for React components and generic utility code.
- A test named `myTest.test.server.ts` will be executed only in the Node server environment. Use to test your Graphql resolvers for instance.

### React Testing library

We have preinstalled [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and [React Testing Hooks](https://github.com/testing-library/react-hooks-testing-library).

### Tests for Vulcan Next (for contributors only)

We have a unit tests for some key features and scripts of VN, through the `tests/vns` folder.

This folder is ignored when running `yarn run test:unit`, to avoid bloating your own tests.

### MDX parsing, magic imports with ~

[jest-transformer-mdx](https://github.com/bitttttten/jest-transformer-mdx) allow importing .mdx also in Jest

## Unified testing patterns

We strive to unify testing patterns between Cypress and Jest where it makes sense.

First, add [React Testing queries into Cypress](https://github.com/testing-library/cypress-testing-library), so you can fetch elements with similar patterns. Check [React Testing docs for example of the reverse approach](https://testing-library.com/docs/react-testing-library/setup#add-custom-queries) (data-cy in React Testing).

### Unified test coverage

We followed awesome [recommandations from Bahmutov](https://github.com/bahmutov/cypress-and-jest) to unify Cypress and Jest coverage. This is crucial to have a clearer vision of what is correctly tested in your application, whatever the test method is. For instance, e2e tests provides a huge coverage for React components, while unit tests are more efficient for helpers, hooks and functions.

`yarn run coverage` will run tests and compute the unified report in `coverage`.

`yarn run reports:combined` will compute the combined report without running tests.

[More insights with Cypress](https://glebbahmutov.com/blog/combined-end-to-end-and-unit-test-coverage/)

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

Note: at the time of writing (2020/06) [there is an open issue when needing this command in multiple tests](https://github.com/VulcanJS/vulcan-next/issues/40)

### Loads .env.development the same way next does

We use a plugin that will in turn rely on Next.js dotenv loading capabilities.
Used for instance to load the default admin user credentials in tests.
As a default, it will use development values from `.env.development`.

## Storybook

### Same import as in Next

We reuse our Webpack config extension function, so you can enjoy magic imports and isomorphic imports in Storybook too.

### Styling with Styled JSX and CSS Modules

Note: CSS modules are currently not appearing correctly in Storybook, see [vulcan-next/issues/20](https://github.com/VulcanJS/vulcan-next/issues/20)

### Public folder

Storybook is aware of the `public` folder, so it will display images accordingly.

### I18n

We reuse the same i18n config as in the app, so your stories will be internationalized automatically.

### Webpack bundle analyzer for storybook

There is nothing worse than a slow Storybook build, you can debug your Webpack bundle using `yarn run analyze-bundle:storybook`

### Mock packages

See `.storybook/mocks/packages` and `.storybook/main.js`, we use Webpack alias to load them. Thus, you can use components that rely on `next/router` and `next/config` for instance.
