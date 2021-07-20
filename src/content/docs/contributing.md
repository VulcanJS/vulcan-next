# Contributing

## Dev environment

### Get the right Node version

The `.nvmrc` contains the Node version we use in VN. Usually, higher up versions will also work, but may introduce unexpected breaking changes.

We recommend to install Node using [NVM for Linux/Mac](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows), especially if you need to maintain multiple projects.

## Branches

We follow the Git Flow model.

- `devel`: Devel is the next version. **This is where you want to start for contribution**.
- `main`: is the current live version.
- `bugfix/*`: Bugfixes branches should start from main.
- `feature/*`: features branches should start from devel.
- `support/*x.x.x*`: is for bugfixes for a specific version.
- Tags allow to easily find the commit corresponding to a deployed versions.

## Vulcan NPM local installation

If you want to use the bleeding edge version of Vulcan, you'll need to install the Vulcan NPM packages locally.
Vulcan NPM is relying on Lerna.

We rely on Yalc to set a local registry that simulates NPM behaviour. This palliates limitations of `yarn link`, which is simpler, but creates unexpected issues with duplicate `node_modules` (the symlinked package keeps using `node_modules` from the monorepo instead of your app, leading to duplicate React instance, wrong Webpack version...).

- In Vulcan NPM, run `yarn run local-publish`. This will use `yalc` to simulate a local NPM registry (quite similarly to METEOR_PACKAGE_DIRS)
- In Vulcan Next, run `yarn run link-vulcan`. This will symlink Vulcan packages to the local registry.

If you modify Vulcan NPM:

- In Vulcan NPM, run `yarn run build`
- Rerun the workflow (local publish in Vulcan NPM ; and link in Vulcan Next)

It's exactly as publishing on NPM, but locally. You need to republish the updated package, and reinstall it again.

### Troubleshoot

#### Issues with hooks due to multiple version of React

This is an open issue with Yarn workspaces, it is difficult not to duplicate packages used both by your NPM packages and your local app.
Easiest solution is to force Vulcan Next to use the packages from Vulcan NPM. See relevant scripts in both Vulcan NPM (to activate the link)
and Vulcan Next (to use linked versions).

## Deployment of Vulcan Next demo on Vercel

Vercel only provide a free-tier for personnal accounts. Therefore, `https://vulcan-next.vercel.app` is based on [eric-burel/vulcan-next fork](https://github.com/eric-burel/vulcan-next) instead of the main repo [VulcanJS/vulcan-next](https://github.com/VulcanJS/vulcan-next).

[wei/pull](https://github.com/wei/pull) bot is used to automatically synchronize this fork with the main Vulcan Next repository. The application will be deployed automatically when Vulcan Next master branch is updated, but expect some latency because of this fork setup.
