module.exports = {
  useRouter: () => ({
    push: console.log,
    pathname: "/",
    query: {},
  }),
};
