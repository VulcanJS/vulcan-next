/**
 * Various helpers for i18n
 */
import { NextPageContext } from "next";

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
// interface IncomingMessageWithI18n extends IncomingMessage {
//   language?: string;
//   i18n: any;
// }

const rtlLocales: Array<string> = [
  /** Add locales of languages that reads right-to-left, depending on your own needs (persian, arabic, etc.)*/
];

export const i18nPropsFromCtx = (
  ctx: NextPageContext
): Partial<HtmlLanguageProps> => {
  // At the time of writing (2021, Next 12) Next.js automatically handles the "lang" attribute
  const locale = ctx.locale;
  if (!locale) return {};
  let dir = "ltr";
  if (rtlLocales.includes(locale)) {
    dir = "rtl";
  }

  // "dir" (the language direction) may need more investigation
  return {
    dir,
    //dir: req.i18n && req.i18n.dir(req.language),
  };
};
