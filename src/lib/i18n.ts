import I18N from "next-i18next";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
console.log("config", getConfig(), publicRuntimeConfig);
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
