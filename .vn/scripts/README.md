# How to develop a script

## Separate build for scripts

You may want to enjoy TypeScript within scripts, and also reuse
handy helpers you created in the app, like the Mongoose connection code.

To do so, you need a build-step outside of Next, that mimicks most of the same feature
but can run independently.

To achieve this, you need a mix between Webpack and TypeScript. Webpack is responsible
for creating one bundled .js file, TypeScript for transpiling the code.

Hopefully, Vercel got us covered already for the config: see https://github.com/vercel/ncc

## Step by step

- Code your script in "./ts-sources"
- Build the scripts using `yarn run build:scripts` => you end up with a few .js file at the root.
- Commit the built JS file to the git repository. Note: usually, we don't commit built files,
but it's ok for scripts because they don't change often.
