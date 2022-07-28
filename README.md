# Vulcan Next

Vulcan Next helps you build GraphQL-based applications with Next.js.

<picture>
  <source
   srcSet="https://raw.githubusercontent.com/VulcanJS/vulcan-next/devel/public/img/vn-logo-full-padded-dark-840.png"
    media="(prefers-color-scheme: dark)"/>
  <img src="https://raw.githubusercontent.com/VulcanJS/vulcan-next/devel/public/img/vn-logo-full-padded-840.png" alt="vulcan-next banner" />
</picture>

## What's in the box?

Where Vulcan Next shines:

- B2B SaaS software, CMS, platforms
- Apps that rely a lot on CRUD operations (managing and listing data structure, like in a CMS)
- APIs that can be consumed by multiple clients (your own app but also a mobile version, data scientists, other 3rd party apps...)

Vulcan Next provides:

- A production-grade Next.js + Apollo GraphQL boilerplate. 
- A GraphQL API endpoint set up with Apollo Server and a Mongo connector, so you can start coding back-end features immediately.
- Development tooling such as Cypress, Jest, Storybook... and many others.
- Schema-based helpers and hooks to quickly generate and consume your own GraphQL API
- Password based authentication with Passport

[Join the Slack and meet Vulcan contributors](http://slack.vulcanjs.org/)

[Join the new Discord and meet Vulcan contributors](https://discord.gg/4dqeKSNv)

[Get started with the live tutorial](https://vulcan-next.vercel.app/learn)

[Read the introductory article on FreeCodeCamp](https://www.freecodecamp.org/news/how-to-replace-meteor-by-next-introducing-vulcan-next-starter/)

[Check the full documentation](https://vulcan-docs.vercel.app)

## A word about the core team and sponsoring

You can't teach an old dog new tricks! Vulcan Next is the successor of "Vulcan.js", the Meteor framework from [Sacha Greif](https://sachagreif.com/). It inherits years of experience, with a modernized architecture that replaces Meteor by Next.js.

Vulcan Next powers the [Devographics](https://www.devographics.com/) surveys [State of JS](https://stateofjs.com/), [State of CSS](https://stateofcss.com/) and [State of GraphQL](https://www.stateofgraphql.com/).

**Not familiar with Next.js yet?** You can join the [Next.js course at Human Coders](https://www.humancoders.com/formations/next-js-en) from [Eric Burel](https://twitter.com/ericbureltech), 3 days to understand the inner workings of Next.js router, server and static rendering, edge middlewares and all their friends.

**Want to help us building high quality boilerplates?** You can sponsor Vulcan on [Open Collective](https://opencollective.com/vulcan) or reach us out for bounties and freelance work (ping us on Vulcan slack or Discord).

---

## Install and run in 5 minutes

**Pro tip:** you can test Vulcan Next with zero install by cloning it on [CodeSandbox](https://projects.codesandbox.io/).

If you prefer a local install:

```sh
git clone -b main https://github.com/VulcanJS/vulcan-next
cd vulcan-next
yarn
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
You can then access the live tutorial on [http://localhost:3000/learn](http://localhost:3000/learn).

---

## Next steps

### Setup your own git repository

When creating your own application, you'll want to host the code on your own Git repository (on GitHub, BitBucket, etc.).

#### Point git to your own repository

Rename "origin" to "upstream", so you can use your own git repository as the main "origin", and VN official repo as "upstream".

```sh
git remote rename origin upstream
# Then do what you need to create your own origin remote
# git remote add origin <your-own-git-repository-url>
```

### Roll your own Mongo database

As a default, Vulcan Next will connect to a sample read-only database owned by LBKE.
To create your own application, you'll want to use your own databse.

#### 0. I am a Windows user (if using Mac or Linux skip to 1.)

If you use Windows, you might want to either:

- Install [Ubuntu as a dual boot](https://help.ubuntu.com/community/WindowsDualBoot) (virtual machine are technically fine but way slower and could lead to a poor development experience)
- Setup the [Linux subsystem](https://docs.microsoft.com/fr-fr/windows/wsl/install) in order to be able to run [Docker on Windows](https://docs.docker.com/desktop/windows/wsl/)

- Install MongoDB using the [Windows installer](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

#### 1. Run a Mongo server using Docker

It will run Mongo in your current terminal, or create and run a Mongo image if it's the first time your run the command.

**Note:** you should always start your database *before* you run the application.

```sh
yarn run start:mongo
```

[**See Docker installation instruction for Ubuntu here**](https://docs.docker.com/engine/install/ubuntu/) if you don't have Docker yet.

#### 2. Configure your application to use your local database

In `.env.development` or `.env.development.local` use this URI for Mongo:

```sh
MONGO_URI="mongodb://localhost:27017/vulcan-next-app"
```

You can then stop the server and start it again.

We advise to use [MongoDB Compass](https://www.mongodb.com/try/download/compass) to visualize your database content.

### Update your app to the latest version of Vulcan Next

**Beware:** Vulcan Next is a boilerplate, the possibility to update automatically is not guaranteed. You may
have to apply the updates by hand, comparing Vulcan Next latest version to your own code. **Always double-check that the merge didn't break your app!**.

```sh
# Get the latest version of Vulcan Next locally
git fetch upstream
# Merge to your own code (favouring your own code as a default in case of conflict)
git merge upstream/main -X ours
```

---

## Contribute or raise an issue

This starter is **read-only**! Please avoid opening pull requests against it.

All developments [happen in our monorepo "Vulcan NPM" here.](https://github.com/VulcanJS/vulcan-npm)

---

## They support Vulcan Next and Vulcan Meteor

### Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/VulcanJS/vulcan-next/graphs/contributors"><img src="https://opencollective.com/vulcan/contributors.svg?width=890&button=false" /></a>

### Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/vulcan#contribute)]

<a href="https://opencollective.com/vulcan#contributors" target="_blank"><img src="https://opencollective.com/vulcan/backers.svg?width=890"/></a>

### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/vulcan#contribute)]

<a href="https://opencollective.com/vulcan#contributors" target="_blank"><img src="https://opencollective.com/vulcan/sponsors.svg?width=890"/></a>

### Technical supports

They give time and share knowledge to support the project.

<a href="https://aplines.com" target="_blank" rel="noopener noreferrer">
<img src="https://aplines.com/wp-content/uploads/2022/03/cropped-aplines-logo.png" alt="aplines" height="75"/>
</a>
<a href="https://www.lbke.fr" target="_blank" rel="noopener noreferrer">
<img src="https://www.lbke.fr/img/logo-md.png" height="75" alt="lbke" />
</a>
<a href="https://letter.so/" target="_blank" rel="noopener noreferrer">
<img src="https://github.com/VulcanJS/vulcan-next/blob/devel/public/img/letter-96x96.png?raw=true" height="75" alt="lette.so" />
</a>

## Other cool Next stuff

- [Official Apollo example from Next](https://github.com/zeit/next.js/tree/canary/examples/with-apollo)
- [Next Right Now](https://github.com/UnlyEd/next-right-now) (a complete Next Starter, relying on Prisma cloud solutions for the backend)
- [Blitz](https://blitzjs.com/) (fullstack Next without GraphQL)
- [Next Antd Graphql Starter](https://github.com/clement-faure/next-antd-graphql-starter)
- [Next React Graphql Apollo Bootstrap](https://github.com/Sebastp/Next-react-graphql-apollo_Boostrap)
- [Next advanced starter](https://github.com/borisowsky/next-advanced-starter),
- [Next - Mongo](https://github.com/hoangvvo/nextjs-mongodb-app) (no Express, no GraphQL, just Next and Mongo)
- [Next and TypeScript from the maker of next-transpile-modules](https://github.com/martpie/monorepo-typescript-next-the-sane-way)
- [A frontend performance oriented starter](https://github.com/ixartz/Next-js-Boilerplate)
- [Bison, a full-stack Next.js starter](https://github.com/echobind/bisonapp)
- [Nextra](https://github.com/shuding/nextra), a no-code site generator with Markdown (great for blogging)
- [BlueLibs](https://www.bluelibs.com/docs/), a toolkit that also proposes a React starter

---

## About Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=vulcan&utm_campaign=oss) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Powered by Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)](https://vercel.com?utm_source=vulcan&utm_campaign=oss)
