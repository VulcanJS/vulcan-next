# Use the same version than in  your app, see .nvmrc file
FROM node:14.17.5-alpine

WORKDIR /app

COPY . /app

RUN yarn install --ignore-optional --pure-lockfile
# If you want to reduce the bundle size
# RUN yarn cache clean


RUN yarn build

# Yarn don't yet have the feature of removing dev only node_modules after production install
# @see https://github.com/yarnpkg/yarn/issues/6373
# Comment if you have issue with yarn run start
RUN npm prune --production

CMD yarn run start
