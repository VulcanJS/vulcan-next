import React from "react";
import { ServerStyleSheet } from "styled-components";
import { AppSheetsCollector } from "@vulcanjs/next-style-collector";

export const getAppEnhancer = (): AppSheetsCollector => {
  const sheet = new ServerStyleSheet();
  const enhanceApp = (App) => (props) =>
    (sheet as any).collectStyles(<App {...props} />);
  return {
    sheets: sheet, // MUI and Styled components have non normalized types, so we renormalize the names
    enhanceApp,
    finally: () => sheet.seal(),
  };
};
// @see https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.js
// This function do not generalize when you have another lib collecting stylesheets (eg Material UI)
/*
const getSCDocumentInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    // get parent props
    // NOTE: we need to have already enhanced ctx, so it has to be done here
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};
export default getSCDocumentInitialProps;
*/
