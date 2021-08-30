#! /bin/bash

# Link other packages that we don't want to duplicate when using Lerna
# yarn link react
# yarn link react-dom

# Use list-packages script from Vulcan NPM repo to update the list
# We prefer yalc to yarn, because it has a more consistent behaviour regarding linking
# => in particular it will use your local install of React instead of the install from Vulcan NPM
# which prevents duplicating React and thus breaking the rule of hooks
./node_modules/.bin/yalc link @vulcanjs/core
./node_modules/.bin/yalc link @vulcanjs/demo
./node_modules/.bin/yalc link @vulcanjs/graphql
./node_modules/.bin/yalc link @vulcanjs/i18n
./node_modules/.bin/yalc link @vulcanjs/mdx
./node_modules/.bin/yalc link @vulcanjs/meteor-legacy
./node_modules/.bin/yalc link @vulcanjs/model
./node_modules/.bin/yalc link @vulcanjs/mongo
./node_modules/.bin/yalc link @vulcanjs/multi-env-demo
./node_modules/.bin/yalc link @vulcanjs/permissions
./node_modules/.bin/yalc link @vulcanjs/react-ui
./node_modules/.bin/yalc link @vulcanjs/react-hooks
./node_modules/.bin/yalc link @vulcanjs/schema
./node_modules/.bin/yalc link @vulcanjs/utils