## Features from Next

- TypeScript

[Relevant Next doc](https://nextjs.org/docs/basic-features/typescript)

- Code in `src`

All your code should go into the `/src` directory ([doc](https://nextjs.org/docs/advanced-features/src-directory)).

This folder structure is officially supported by Next. It is relevant when you have a lot of development tooling alongside your actual codebase, like we do in Vulcan.

- Package-oriented architecture

The structure of a plugin system of Next is still [under discussion](https://github.com/vercel/next.js/discussions/9133). In the meantime, we strive to provide code as clean as possible, structured in package, so you can easily remove prebundled features.

To do so, we currently use a Webpack config so folders in `packages/@vulcan` can be imported the same way as `node_modules`. `packages/@vulcan/core` can be imported as `import "@vulcan/core"`.
You can reproduce the same behaviour with any other prefix by changing `tsconfig.common.json`

You are not forced to structure your own code as packages though.

- Magic src imports with `~`

Import code in `src` from anywhere by writing `import "~/components/foobar"`.

Relative imports are a huge mess to support. A relative import should never go further than the category it belongs too: `pages` should never have to import `components` using a messy `../../../components/myComponent`.

- Quasi-imorphism

We allow folders and packages to contain an `index.client` or `index.server` file, that will be used at build time depending on the environment.
/!\ You still need to have a bare `index` file alongside those environment specific file. Otherwise TypeScript will complain (see the "Failures and learnings" documentation for more details).

## TODO

Cypress
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
i18n
Material UI
Graphql
TypeScript for dynamic component
Error tracking with Sentry
ES6 webpack config?
Reproduction of various small issues

## Failures & learnings

### Isomorphic packages

#### The idea

Meteor is smart enough to automatically differentiate server bundle from client bundle. This allows you to create isomorphic packages, meaning that you can share the exact same code between client and server.

We tried this approach in `v0.0.1`, using Webpack. See the `multi-env-demo` and `webpack` folders.

```
multi-env-demo
|   index.client.ts
|   index.server.ts
```

At build time, we added some Webpack magic so that `import "@vulcan/multi-env-demo` is replaced by `import "@vulcan/multi-env-demo/index.client"` in the browser, and `index.server` in the server build.

### The problem

What went wrong? The problem is that the concept of environment is foreign to the code itself. TypeScript and VS Code won't be able to tell whether you want to import `client` or `server`, and it will necessarily break autocompletion.

[See this SO question for instance](https://stackoverflow.com/questions/61386301/webpack-metro-mainfiles-module-resolution-with-typescript)

### Learning

- Magic isomorphism, with build time replacement, is bad for static analysis. You should not need to replace your `import` statement at build time. To be avoided.

Magic isomorphism is when you actually want to load a different piece of code depending on the environment, but hide this magic from the developer.

- Muggle isomorphism, is perfectly fine.

Muggle isomorphsim is when you write code that is perfectly working on both the server and the client.

So, with the same example, if you need a client side only import, do `import "@vulcan/multi-env-demo/client"` (resp. server). If you have shared code, do create an `index` file in your `multi-env-demo` packager and `import "@vulcan/multi-env-demo"`. No magic, make things explicit.

### But it works in Blitz?

If you have used the Next framework Blitz, you'll notice that [they provide magic isomorphism for server queries](https://github.com/blitz-js/blitz/blob/rfc-architecture/rfc-docs/01-architecture.md#c-how-the-heck-does-that-work). This patterns works because it is targeted a precise use case, where one environment owns the logic, the `server`. The `client` counterpart is simply an RPC call to the server function, it does not add any relevant logic. So the `server` is considered as the default environment for static analysis.

We did not follow this road, because we wanted to find a more generic pattern, more similar to hoiw Meteor works. In some case, client code can actually own the logic, for example when importing some non-SSR ready component. We can't safely consider the server as the "default" environment.

(big thanks to @flybayer for explaining Blitz internals to us)
