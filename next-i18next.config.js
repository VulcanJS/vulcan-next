// NOTE: please do not move this file, it has to be at the root
// @see https://github.com/isaachinman/next-i18next
// It accepts the same props as a "normal" Next.js i18n config
// @see https://nextjs.org/docs/advanced-features/i18n-routing
module.exports = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    // We disable automated locale based redirection, because it leads to a confusing user
    // experience depending on where the user initially lands (only "/" will redirect, but not pages)
    localeDetection: false,
  },
};
