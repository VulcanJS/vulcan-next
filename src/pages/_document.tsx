// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from "next/document";
import theme from "~/lib/material-ui/defaultTheme";
import { getMuiDocumentInitialProps } from "@vulcan/next-material-ui";
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
  const muiAndDocumentInitialProps: DocumentInitialProps = await getMuiDocumentInitialProps(
    ctx
  );

  const i18nDocumentProps = i18nPropsFromCtx(ctx);

  return {
    ...muiAndDocumentInitialProps,
    i18nDocumentProps,
  };
};
