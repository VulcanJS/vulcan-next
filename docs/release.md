# Release process

## Create a release branch

```sh
### To the right branch
git checkout devel && git pull
cat package.json | grep version # to get the current version
git checkout -b release/<next-version>
git merge master # get hot fixes if any
rm -Rf node_modules && yarn install # no missing module surprise

```

## Run the app,  run tests

```sh

### Test process
# Fix any problem that occur during those tests
# Check devel run
yarn run dev
# Check production run
yarn run build && yarn run start # test the production app
# Check static run
yarn run build:static && yarn run start:static
# Run tests
yarn run test
# Run tests specific to Vulcan Next Starter (longer)
yarn run test:vns
# Test storybook
yarn run storybook
# Test storybook static build
yarn run build:storybook && yarn run start:storybook-static # test storybook  static export

### Versionning
yarn run auto-changelog 
# Complete the migrating documentation if there are breaking changes
yarn version <level> # patch or minor or major depending on the situation
```

## Deploy

```sh

### Deploy
git checkout master && git merge release/<next-version>
git push

### Update devel branches with fixes
git checkout develop && git pull && git merge master && git push

```