# Vulcan Next

![vulcan-next-starter banner](https://raw.githubusercontent.com/VulcanJS/vulcan-next-starter/devel/public/img/vn-logo-full-1280-640.png)

[Check the features](https://github.com/VulcanJS/vulcan-next-starter/tree/devel/src/pages/docs/features.md)

[Read the introductory article](https://www.freecodecamp.org/news/how-to-replace-meteor-by-next-introducing-vulcan-next-starter/)

## Install and run

```
git clone https://github.com/VulcanJS/vulcan-next-starter.git
yarn
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
You can then access the live docs on [http://localhost:3000/docs](http://localhost:3000/docs).

### Setup your own git

```
# Rename "origin" to "upstream", so you can use your own git repository as the main origin and VN official repo as "upstream"
git remote rename origin upstream
```

## Connect to a Vulcan backend

[If you don't know the awesome GraphQL framework Vulcan, get started here](http://vulcanjs.org/)

In another terminal, run a Vulcan application on `localhost:3001`:

```bash
cd SomeVulcanApp
meteor run --settings settings.json --port 3001
```

Run Vulcan Next development server:

```bash
# We favour Yarn over NPM for commands
NEXT_PUBLIC_GRAPHQL_URI="your-vulcan-server-url" yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## They support Vulcan Next and Vulcan Meteor

### Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/VulcanJS/vulcan-next-starter/graphs/contributors"><img src="https://opencollective.com/vulcan/contributors.svg?width=890&button=false" /></a>

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
