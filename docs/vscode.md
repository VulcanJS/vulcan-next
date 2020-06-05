# Contributing

## Dev environment

### Setup VS Code with Prettier

TODO

### Use the same Node version

The `.nvmrc` contains the Node version we use in VNS. Usually, higher up versions will also work, but may introduce unexpected breaking changes.

We recommend to install Node using [NVM for Linux/Mac](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows), especially if you need to maintain multiple projects.

## Branches

We follow the Git Flow model.

- Master is the current live version.
- Bugfixes branches should start from master.
- Devel is the next version.
- Features branches should start from master.
- support/x.x.x is for bugfixes for a specific version.
- Tags allow to easily find the commit corresponding to a deployed versions.