In this folder, you can isolate code that can be structed in packages.

Usually, your code may evolve like this:

- at first, it lives in `src/core`
- if you identify a feature that can be isolated, you can move it to `src/myFeature`
- if this feature might be reusable for multiple Next.js app, you can move it to `packages/myFeature`
- finally, you may want to publish it as an NPM package. You can reach us out to include it in the [Vulcan NPM monorepo](https://github.com/VulcanJS/vulcan-npm)