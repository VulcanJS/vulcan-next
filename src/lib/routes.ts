// NOTE: those function can also be used server-side, for instance in mails
export const routes = {
  home: {
    href: "/",
  },
  account: {
    root: {
      href: "/account",
    },
    forgottenPassword: {
      href: "/account/forgotten-password",
    },
    resetPassword: {
      href: "/account/reset-password",
    },
    verifyEmail: {
      href: "/account/verify-email",
    },
    login: {
      href: "/account/login",
    },
    signup: {
      href: "/account/signup",
    },
    profile: {
      href: "/account/profile",
    },
  },
};
