# Contributing

## Dev environment

### Get the right Node version

The `.nvmrc` contains the Node version we use in VNS. Usually, higher up versions will also work, but may introduce unexpected breaking changes.

We recommend to install Node using [NVM for Linux/Mac](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows), especially if you need to maintain multiple projects.

## Branches

We follow the Git Flow model.

- `master`: is the current live version.
- `bugfix/*`: Bugfixes branches should start from master.
- `devel`: Devel is the next version.
- `feature/*`: features branches should start from master.
- `support/*x.x.x*`: is for bugfixes for a specific version.
- Tags allow to easily find the commit corresponding to a deployed versions.

## Vulcan NPM local installation

If you want to use the bleeding edge version of Vulcan, you'll need to install the Vulcan NPM packages locally.
Vulcan NPM is relying on Lerna

### Troubleshoot

#### Issues with hooks due to multiple version of React

This is an open issue with Yarn workspaces, it is difficult not to duplicate packages used both by your NPM packages and your local app.
Easiest solution is to force Vulcan Next to use the packages from Vulcan NPM. See relevant scripts in both Vulcan NPM (to activate the link)
and Vulcan Next (to use linked versions).
