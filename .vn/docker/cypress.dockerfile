
# @see https://github.com/cypress-io/cypress/issues/419
# @see https://github.com/cypress-io/cypress-docker-images/tree/master/base
FROM cypress/base:10.16.0

WORKDIR /app

# Copy sources, tests, and stories (test might reuse Storybook stuffs)
# Use .dockerignore if some folders are not needed
COPY . /app

RUN yarn install --frozen-lockfile

RUN yarn run build

CMD yarn run start-server-and-test start:test http://localhost:3000 cypress:run
