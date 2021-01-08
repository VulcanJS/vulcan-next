# Release process

## Create a release branch

```sh
### To the right branch
git checkout master && git pull
git checkout devel && git pull
# cat package.json | grep version # to get the current version
# git checkout -b release/<next-version>
git merge master # get hot fixes if any
git merge devel
rm -Rf node_modules && yarn install # no missing module surprise

```

## Run the app, run tests

```sh

### Test process
# Fix any problem that occur during those tests
# Check devel run
yarn run dev
```

```sh
# Check production run
yarn run build
yarn run start # test the production app
```

```sh
# Check static build and run
yarn run build:static && yarn run start:static
# Run tests
yarn run test
# Run tests specific to Vulcan Next (longer)
yarn run test:vn
# Test storybook
yarn run storybook
# Test storybook static build
yarn run build:storybook && yarn run start:storybook-static # test storybook  static export

# Optionnaly test Docker version (takes a lot of time + not very useful as they don't change often)
# yarn run build:docker
# yarn run build:test:docker
# yarn run start:docker
# yarn run test:docker
```

```sh
### Versionning
# Complete the migrating documentation if there are breaking changes
npm version patch # patch or minor or major depending on the situation
# yarn version --new-version <level>  # command for yarn v1
# yarn version patch # works only with yarn v2 @see https://github.com/yarnpkg/yarn/issues/5367
yarn run auto-changelog # update changelog
git commit -am "bump version"
```

## Deploy

```sh

### Deploy
git checkout master && git merge release/<next-version>
git push

### Update devel branches with fixes
git checkout develop && git pull && git merge master && git push

```
