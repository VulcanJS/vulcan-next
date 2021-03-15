/**
 * Default layout, to be used in pages
 *
 */
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="PageLayout root">
    {children}
    <style jsx>{`
      .PageLayout.root {
        margin: 32px auto;
        max-width: 1000px;
      }
    `}</style>
  </div>
);

export default PageLayout;
