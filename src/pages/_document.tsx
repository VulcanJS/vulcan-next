// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  //DocumentInitialProps,
} from "next/document";
import theme from "~/lib/style/defaultTheme";
import {
  getAppEnhancer as getMuiAppEnhancer,
  //getMuiDocumentInitialProps,
} from "@vulcanjs/next-material-ui";
import { i18nPropsFromCtx, DocumentLanguageProps } from "~/lib/i18n";

interface VNSDocumentProps {
  i18nDocumentProps: Partial<DocumentLanguageProps>;
}
export default class MyDocument extends Document<VNSDocumentProps> {
  render() {
    const { i18nDocumentProps } = this.props;
    return (
      <Html
        {...i18nDocumentProps}
        data-app-version={process.env.NEXT_PUBLIC_PKGINFO_VERSION}
      >
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const muiAppEnhancer = getMuiAppEnhancer();
  const enhancers = [muiAppEnhancer];

  // Enhance Next page renderer so it also applies MUI and Styled Components stylesheets collectors
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          const enhanced = enhancers.reduce((_enhanced, enhancer) => {
            return enhancer.enhanceApp(_enhanced);
          }, App);
          return enhanced(props);
          //return scAppEnhancer.enhanceApp(muiAppEnhancer.enhanceApp(App))(props);
        },
      });

    // Run the renderer
    const initialProps = await Document.getInitialProps(ctx);

    // i18n
    const i18nDocumentProps = i18nPropsFromCtx(ctx);

    return {
      ...initialProps,
      i18nDocumentProps,
      // Stylesheets have been collected during the getInitialProps call, we can now get the styles
      styles: (
        <>
          {initialProps.styles}
          {enhancers.map((e) => e.sheets.getStyleElement())}
        </>
      ),
    };
  } finally {
    enhancers.forEach((e) => {
      if (e.finally) e.finally(); // for example will seal stylesheet for Styled Components
    });
  }
};
