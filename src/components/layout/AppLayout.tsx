/**
 * Layout reused on all pages
 *
 * /!\ keep it minimal, and enhance the PageLayout instead,
 * so that changing layout for certain pages is easier
 */
import { typeScale } from "~/lib/style/typography";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="global">
    {children}
    <style jsx global>{`
      /* FIXME: ignore errors when using "vscode-styled-jsx", as we also use PostCSS */
      /* Typescale */
      .global {
        body {
          font-size: ${typeScale.default};
        }
        h1,
        .MuiTypography-h1 {
          font-size: ${typeScale.h1};
          /* 61px */
        }
        h2,
        .MuiTypography-h2 {
          font-size: ${typeScale.h2};
          /* 29px */
        }
        h3,
        .MuiTypography-h3 {
          font-size: ${typeScale.h3};
          /* 29px */
        }
        h4,
        .MuiTypography-h4 {
          font-size: ${typeScale.h4};
          /* 29px */
        }
        h5,
        .MuiTypography-h5 {
          font-size: ${typeScale.h5};
          /* 29px */
        }
        p,
        .MuiTypography-body1,
        .MuiTypography-body2 {
          font-size: ${typeScale.p};
        }
        .helper,
        .MuiTypography-caption {
          font-size: ${typeScale.helper};
          /* 14 px */
        }
        .legal {
          font-size: ${typeScale.legal};
          /* 12 px */
        }
        /* Text spacing */
        p,
        p.MuiTypography-root {
          margin-bottom: 0.6em;
        }
        h1,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 32px;
          margin-bottom: 16px;
        }
        h2 {
          margin-top: 48px;
          margin-bottom: 16px;
        }
      }
    `}</style>
  </div>
);

export default AppLayout;
