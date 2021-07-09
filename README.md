# Vulcan Next

Vulcan Next helps you build GraphQL-based applications with Next.js.

![vulcan-next banner](https://raw.githubusercontent.com/VulcanJS/vulcan-next/devel/public/img/vn-logo-full-1280-640.png)

## What's in the box?

Vulcan Next provides:

- A production-grade Next.js + Apollo GraphQL boilerplate. It includes development tooling such as Cypress, Jest, Storybook, MDX... and many others.
- A GraphQL API endpoint set up with Apollo Server, so you can start coding back-end features immediately.
- Schema-based helpers and hooks to quickly generate and consume your own GraphQL API.

[Join the Slack](http://slack.telescopeapp.org/)

[Check all the features](https://github.com/VulcanJS/vulcan-next/tree/devel/src/content/docs/features.md)

[Read the introductory article](https://www.freecodecamp.org/news/how-to-replace-meteor-by-next-introducing-vulcan-next-starter/)

## A word about Vulcan.js aka Vulcan Meteor

You can't teach an old dog new tricks! Vulcan Next is the successor of "Vulcan.js", the Meteor framework from [Sacha Greif](https://sachagreif.com/). It inherits years of experience, with a modernized architecture that replaces Meteor by Next.js.

---

## Install and run

```sh
git clone https://github.com/VulcanJS/vulcan-next.git
yarn
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
You can then access the live docs on [http://localhost:3000/docs](http://localhost:3000/docs).

### Setup your own git repository

#### Initialization

Rename "origin" to "upstream", so you can use your own git repository as the main origin and VN official repo as "upstream".

```sh
git remote rename origin upstream
# Then do what you need to create your own origin remote
# git remote add origin <your-own-git-repository-url>
```

#### Update

**Beware:** Vulcan Next is a boilerplate, the possibility to update automatically is not guaranteed. You may
have to apply the updates by hand, comparing Vulcan Next latest version to your own code.

```sh
# Get the latest version of Vulcan Next locally
git fetch upstream
# Merge to your own code (favouring your own code as a default in case of conflict)
git merge upstream/master -X ours
```

### Roll your own Mongo database

As a default, Vulcan Next will connect to a sample read-only database owned by LBKE.
To create your own application, you'll want to use your own databse.

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
<img src="https://aplines.com/wp-content/uploads/2020/06/logo-1.png" alt="aplines" height="75"/>
</a>
<a href="https://www.lbke.fr" target="_blank" rel="noopener noreferrer">
<img src="https://www.lbke.fr/img/logo-md.png" height="75" alt="lbke" />
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

---

# About Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
