#! /bin/bash
yarn link @vulcanjs/core
yarn link @vulcanjs/demo
yarn link @vulcanjs/graphql
yarn link @vulcanjs/mdx
yarn link @vulcanjs/meteor-legacy
yarn link @vulcanjs/model
yarn link @vulcanjs/mongo
yarn link @vulcanjs/multi-env-demo
# Those packages are not published yet
# @see https://github.com/VulcanJS/vulcan-npm/issues/6
# yarn link @vulcanjs/next-apollo
# yarn link @vulcanjs/next-config
# yarn link @vulcanjs/next-material-ui
# yarn link @vulcanjs/next-style-collector
# yarn link @vulcanjs/next-styled-components
# yarn link @vulcanjs/next-utils
# yarn link @vulcanjs/next-webpack
yarn link @vulcanjs/react-hooks
yarn link @vulcanjs/schema
yarn link @vulcanjs/utils

# Link other packages that we don't want to duplicate when using Lerna
yarn link react
yarn link react-dom