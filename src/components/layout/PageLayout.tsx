/**
 * Default layout, to be used in pages
 *
 */
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => <div>{children}</div>;

export default PageLayout;
