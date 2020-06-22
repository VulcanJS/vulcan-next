/**
 * Layout reused on all pages
 *
 * /!\ keep it minimal, and enhance the PageLayout instead,
 * so that changing layout for certain pages is easier
 */
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => <div>{children}</div>;

export default AppLayout;
