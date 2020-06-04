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

### TypeScript

### No screenshot/videos as a default

### Custom commands, with TypeScript

[Relevant doc](https://docs.cypress.io/guides/tooling/typescript-support.html#Types-for-custom-commands)

You can write JavaScript tests and still enjoy auto-completion of custom commands, thanks to TS [triple slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).

### Code coverage

### Vanilla JS test files (with Eslint rules)





## TODO

Cypress

i18n

Pure JS support (no TS), in cypress, in code, in storybook, in jest...



PErformance testing?

Jest
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
Cypress commands and typing example
Material UI
Graphql
TypeScript for dynamic component
Error tracking with Sentry
ES6 webpack config?
Reproduction of various small issues
Storybook serve public folder

Efficient plug to Vulcan
Vulcan package standard
