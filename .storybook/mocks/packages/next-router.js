const Router = {
  push: console.log,
  prefetch: console.log,
  replace: console.log,
  reload: console.log,
  back: console.log,
  prefetch: async () => null, // This one fixed it for me
  beforePopState: console.log,
  events: {
    on: console.log,
    off: console.log,
    emit: console.log,
  },
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  basePath: "",
  isFallback: false,
};
export const useRouter = () => Router;
export const withRouter = (C) => (props) => <C {...props} router={Router} />;
export default Router;
