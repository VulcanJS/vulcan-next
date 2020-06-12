import I18N from "next-i18next";
import getConfig from "next/config";

// NOTE: publicRuntimeConfig can be undefined if you just provide an empty object
// @see https://github.com/vercel/next.js/issues/6249#issuecomment-643259623
const { publicRuntimeConfig = {} } = getConfig();
const { localeSubpaths = {} } = publicRuntimeConfig;

const i18nInstance = new I18N({
  defaultLanguage: "en",
  otherLanguages: ["fr"],
  localeSubpaths,
});

// reexport everything
export const {
  Trans,
  Link,
  Router,
  i18n,
  initPromise,
  config,
  useTranslation,
  withTranslation,
  appWithTranslation,
} = i18nInstance;
