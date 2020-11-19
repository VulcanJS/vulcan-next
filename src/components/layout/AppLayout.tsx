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
    <style jsx>{`
      /* FIXME: ignore errors when using "vscode-styled-jsx", as we also use PostCSS */
      /* Typescale */
      div {
        color: red;
      }
    `}</style>
  </div>
);

export default AppLayout;
