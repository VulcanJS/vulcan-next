/**
 * Layout reused on all pages
 *
 * /!\ keep it minimal, and enhance the PageLayout instead,
 * so that changing layout for certain pages is easier
 */
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
          font-size: 16px;
        }
        h1,
        .MuiTypography-h1 {
          font-size: 3.815em;
          /* 61px */
        }
        h2,
        .MuiTypography-h2 {
          font-size: 2.441em;
          /* 29px */
        }
        h3,
        .MuiTypography-h3 {
          font-size: 1.953em;
          /* 29px */
        }
        h4,
        .MuiTypography-h4 {
          font-size: 1.563em;
          /* 29px */
        }
        h5,
        .MuiTypography-h5 {
          font-size: 1.25em;
          /* 29px */
        }
        p,
        .MuiTypography-body1,
        .MuiTypography-body2 {
          font-size: 1em;
        }
        .helper,
        .MuiTypography-caption {
          font-size: 0.8em;
          /* 14 px */
        }
        .legal {
          font-size: 0.7em;
          /* 12 px */
        }
        /* Text spacing */
        p,
        p.MuiTypography-root {
          margin-bottom: 1em;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 32px;
          margin-bottom: 16px;
        }
      }
    `}</style>
  </div>
);

export default AppLayout;
