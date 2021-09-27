import { Container } from "@mui/material";
import { ReactElement } from "react";

/**
 * Default layout, to be used in pages
 *
 */
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <Container sx={{ mx: "auto", my: 2 }}>{children}</Container>
);

/**
 * To be used in pages
 * @example  const MyPageComponent.getLayout = getDefaultPageLayout
 */
export const getDefaultPageLayout = function (page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default PageLayout;
