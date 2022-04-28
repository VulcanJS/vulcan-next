import React from "react";
import { AppSheetsCollector, Sheets } from "@vulcanjs/next-style-collector";

import createEmotionServer from "@emotion/server/create-instance";
// import theme from "/src/theme";
import { createEmotionCache } from "../emotion/createEmotionCache";

export const getAppEnhancer = (): AppSheetsCollector => {
  const cache = createEmotionCache();
  const enhanceApp = (App) =>
    function AppWithEmotionCache(props) {
      return <App emotionCache={cache} {...props} />;
    };
  const sheets: Sheets = {
    getStyleElements: (html) => {
      const { extractCriticalToChunks } = createEmotionServer(cache);
      // This is important. It prevents emotion to render invalid HTML.
      // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
      const emotionStyles = extractCriticalToChunks(html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(" ")}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));
      return emotionStyleTags;
    },
  };
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
