import React from "react";
import { ServerStyleSheets } from "@material-ui/styles";
import { AppSheetsCollector } from "@vulcanjs/next-style-collector";

export const getAppEnhancer = (): AppSheetsCollector => {
  const sheets = new ServerStyleSheets();
  const enhanceApp = (App) => (props) => sheets.collect(<App {...props} />);
  return {
    sheets,
    enhanceApp,
  };
};

// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
// This function do not generalize when you have another lib collecting stylesheets (eg Styled Components)
/*
const getMuiDocumentInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  // get parent props
  // NOTE: we need to have already enhanced ctx, so it has to be done here
  const initialProps = await Document.getInitialProps(ctx);

  return {
    // Styles fragment is rendered after the app and page rendering finish.
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
export default getMuiDocumentInitialProps;
*/
