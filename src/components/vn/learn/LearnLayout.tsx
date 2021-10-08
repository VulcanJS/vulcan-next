import { MuiMdxLayout } from "~/components/layout/MuiMdxLayout";
import { Steps } from "./Steps";
import { Container, Box } from "@mui/material";
export const LearnLayout = ({ children, ...props }) => {
  return (
    <Container sx={{ mx: "auto", my: 2 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { md: "200px 1fr" } }}>
        <nav>
          <Steps />
        </nav>
        <MuiMdxLayout {...props}>
          <main>{children}</main>
        </MuiMdxLayout>
      </Box>
    </Container>
  );
};
