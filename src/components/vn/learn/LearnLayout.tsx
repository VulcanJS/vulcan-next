import { MuiMdxLayout } from "~/components/layout/MuiMdxLayout";
import { Steps } from "./Steps";
import { Container, Box, Typography, Link, Divider } from "@mui/material";
const LearnFooter = () => {
  /*
  TODO: haven't found a way to reuse some md content outside of page yet
const mdSrc=`---

**Had some trouble with this step?**

[Join us on Slack and ask your questions directly](http://slack.vulcanjs.org/)
`*/
  return (
    <footer>
      <Typography variant="subtitle2">
        Had some trouble with this step?
      </Typography>
      <Link href="http://slack.vulcanjs.org" target="_blank" rel="noreferrer">
        Join us on Slack and ask your questions directly
      </Link>
    </footer>
  );
};
export const LearnLayout = ({ children, ...props }) => {
  return (
    <Container sx={{ mx: "auto", my: 2 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { md: "200px 1fr" } }}>
        <nav>
          <Steps />
        </nav>
        <div>
          <MuiMdxLayout {...props}>
            <main>{children}</main>
          </MuiMdxLayout>
          <Divider sx={{ my: 4 }} />
          <LearnFooter />
        </div>
      </Box>
    </Container>
  );
};
