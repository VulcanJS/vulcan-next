# Features

## TypeScript

[Relevant Next doc](https://nextjs.org/docs/basic-features/typescript)

We use TypeScript extensively, and try to enable it wherever possible (sources, Jest, Cypress, Storybook...)

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

## Transition from Vulcan Meteor

If you were using Vulcan Meteor, check `https://github.com/VulcanJS/vulcan-meteor-next-transition` for a demonstration of using Vulcan Next for the frontend
and an existing Vulcan Meteor app for the backend.

## Various

### Passing package.json info to the client app

In `next.config.js`, you'll find a demonstration of how to **safely** inject informations from your `package.json` into your Next application.

For example, we use it to inject current version into the `html` tag for better deployment tracking.

### Sitemap.xml and Robots.txt with next-sitemap

We use [next-sitemap](https://github.com/iamvishnusankar/next-sitemap#readme) to create both the `robots.txt` and `sitemap.xml` in the `postbuild` script.  Change `https://vulcan.next` to your root url in `/vulcan-next-sitemap.js`.  Here's more [configuration options](https://github.com/iamvishnusankar/next-sitemap#configuration-options).

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

Thanks to [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote), you can easily use markdown files as your CMS.
Check the `/docs` page when running the app to see the live documentation.

### MD and MDX import in React

### Loading MD/MDX in Storybook

Work out of the box. Will however disable default behaviour for ".md" import of Storybook, which is replaced by MDX behaviour.

## Debugging

### Webpack bundle analyzer

Run `yarn run analyze-bundle` to get insight on your Webpack build.

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