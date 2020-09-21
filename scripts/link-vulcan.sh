#! /bin/bash
yarn link @vulcan/core
yarn link @vulcan/demo
yarn link @vulcan/graphql
yarn link @vulcan/mdx
yarn link @vulcan/meteor-legacy
yarn link @vulcan/model
yarn link @vulcan/mongo
yarn link @vulcan/multi-env-demo
# Those packages are not published yet
# @see https://github.com/VulcanJS/vulcan-npm/issues/6
# yarn link @vulcan/next-apollo
# yarn link @vulcan/next-config
yarn link @vulcan/next-material-ui
yarn link @vulcan/next-style-collector
yarn link @vulcan/next-styled-components
yarn link @vulcan/next-utils
# yarn link @vulcan/next-webpack
yarn link @vulcan/react-hooks
yarn link @vulcan/schema
yarn link @vulcan/utils

# Link other packages that we don't want to duplicate
yarn link react
yarn link react-dom