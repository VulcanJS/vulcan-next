import { PageLayout } from "~/components/layout";
import { MuiMdxLayout } from "~/components/layout/MuiMdxLayout";
import { Steps } from "./Steps";
export const LearnLayout = ({ children, ...props }) => {
  return (
    <PageLayout>
      <MuiMdxLayout {...props}>
        <nav>
          <Steps />
        </nav>
        <main>{children}</main>
      </MuiMdxLayout>
    </PageLayout>
  );
};
