# Deployment

## Vercel

### Install command

We advise to customize the installation command as follow:

```sh
yarn install --ignore-optional
```

This "Install Command" option is available in your project settings.

### Env variables

Set relevant environment variables, based on the content of `.env.production`. You may need to adapt depending on your application URL and your Mongo database URL.

**Please set your TOKEN_SECRET with a  32 characters unique value in "settings/environment-variables".**

![Example setting the secret token ](/img/docs/env_token_secret.png)

Examples:

- `NEXT_PUBLIC_GRAPHQL_URI`: `https://vulcan-next.vercel.app/api/graphql` (NOTE: we need an absolute URL here)
- `APOLLO_SERVER_CORS_WHITELIST`: `https://vulcan-next.vercel.app,https://www.twaikura.com` (beware of NOT adding a trailing backlash)
- `MONGO_URI`: `<your-mongo-db-url>`

### Vercel.json

Update [vercel.json](https://vercel.com/docs/configuration) to match your project.
