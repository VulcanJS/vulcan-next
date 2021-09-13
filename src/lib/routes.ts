// NOTE: those function can also be used server-side, for instance in mails
export const routes = {
  home: {
    href: "/",
  },
  account: {
    forgottenPassword: {
      href: "/account/forgotten-password",
    },
    resetPassword: {
      href: "/account/reset-password",
    },
    login: {
      href: "/login",
    },
  },
};
