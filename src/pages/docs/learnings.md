# Learnings (and failures!)

## Isomorphic packages in TypeScript

#### The idea

Meteor is smart enough to automatically differentiate server bundle from client bundle. This allows you to create isomorphic packages, meaning that you can share the exact same code between client and server.

We tried this approach in `v0.0.1`, using Webpack. See the `multi-env-demo` and `webpack` folders.

```
multi-env-demo
|   index.client.ts
|   index.server.ts
```

At build time, we added some Webpack magic so that `import "@vulcanjs/multi-env-demo` is replaced by `import "@vulcanjs/multi-env-demo/index.client"` in the browser, and `index.server` in the server build.

### The problem

What went wrong? The problem is that the concept of environment is foreign to the code itself. TypeScript and VS Code won't be able to tell whether you want to import `client` or `server`, and it will necessarily break autocompletion.

There don't seem to be any option in TypeScript to define new possible names or extension for folder `index`, so you can't even specify an order (like ["index", "index.server", "index.client", "main.js"...] for instance). TS will simply ignore files that are not specifically named `index.ts`, `index.tsx`, `index.js`, `index.jsx`.

[See this SO question for instance](https://stackoverflow.com/questions/61386301/webpack-metro-mainfiles-module-resolution-with-typescript)

### Learning

- Magic isomorphism, with build time replacement, is bad for static analysis. You should not need to replace your `import` statement at build time. To be used carefully.

Magic isomorphism is when you actually want to load a different piece of code depending on the environment, but hide this magic from the developer.

- Muggle isomorphism, is perfectly fine.

Muggle isomorphsim is when you write code that is perfectly working on both the server and the client.

So, with the same example, if you need a client side only import, do `import "@vulcanjs/multi-env-demo/client"` (resp. server). If you have shared code, do create an `index` file in your `multi-env-demo` packager and `import "@vulcanjs/multi-env-demo"`. No magic, make things explicit.

### But it works in Blitz?

If you have used the Next framework Blitz, you'll notice that [they provide magic isomorphism for server queries](https://github.com/blitz-js/blitz/blob/rfc-architecture/rfc-docs/01-architecture.md#c-how-the-heck-does-that-work). This patterns works because it is targeted a precise use case, where one environment owns the logic, the `server`. The `client` counterpart is simply an RPC call to the server function, it does not add any relevant logic. So the `server` is considered as the default environment for static analysis.

We did not follow this road, because we wanted to find a more generic pattern, more similar to hoiw Meteor works. In some case, client code can actually own the logic, for example when importing some non-SSR ready component. We can't safely consider the server as the "default" environment.

(big thanks to @flybayer for explaining Blitz internals to us)
