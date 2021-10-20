import I18N from "next-i18next";
import path from "path";
// import getConfig from "next/config";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

// NOTE: publicRuntimeConfig can be undefined if you just provide an empty object
// @see https://github.com/vercel/next.js/issues/6249#issuecomment-643259623
// @see https://github.com/VulcanJS/vulcan-next/issues/62
//const { publicRuntimeConfig = {} } = getConfig();
//const { localeSubpaths = {} } = publicRuntimeConfig;
const i18nInstance = new I18N({
  defaultLanguage: "en",
  otherLanguages: ["fr"],
  localeSubpaths: {},
  // TODO: this code seems to run client-side
  // to be improved when updating i18n
  localePath:
    // @see https://github.com/isaachinman/next-i18next/issues/1202#issuecomment-947779838
    /*typeof path.resolve === "function"
      ? path.join(process.cwd(), `public/locales`) //path.resolve("./public/locales")
      :*/ "./public/locales",
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

// i18next-http-middleware is in charge of enhancing the req object
interface IncomingMessageWithI18n extends IncomingMessage {
  language?: string;
  i18n: any;
}
export const i18nPropsFromCtx = (
  ctx: NextPageContext
): Partial<HtmlLanguageProps> => {
  if (!(ctx && ctx.req && (ctx.req as IncomingMessageWithI18n).language))
    return {};
  const req = ctx.req as IncomingMessageWithI18n;
  return {
    lang: req.language,
    dir: req.i18n && req.i18n.dir(req.language),
  };
};
