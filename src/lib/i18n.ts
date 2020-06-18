import I18N from "next-i18next";
import getConfig from "next/config";
import { ServerResponse } from "http";

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

// Add language info to the custom _document header
export interface DocumentLanguageProps {
  languageDirection: string; // right to left (arabic etc.) or left to right (latin languages etc.)
  language: string;
}
interface HtmlLanguageProps {
  dir: string;
  lang: string;
}
// We except a middleware to enhance the server response
interface ServerResponseWithLocals extends ServerResponse {
  locals?: DocumentLanguageProps;
}
// @see https://github.com/isaachinman/next-i18next/issues/20#issuecomment-558799264
export const i18nPropsFromRes = (
  res?: ServerResponseWithLocals
): Partial<HtmlLanguageProps> => {
  if (!res) return {};
  const { locals } = res;
  if (!locals) return {}; // locals won't exist in a static build
  return {
    dir: locals.languageDirection,
    lang: locals.language,
  };
};
