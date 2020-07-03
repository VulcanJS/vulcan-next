import React from "react";
import { Box, Typography, Container } from "@material-ui/core"; // Next has tree shaking
import StyledComponentsButton from "~/components/ui/StyledComponentsButton";

export default function MuiSCPage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI and Styled components
        </Typography>
        <StyledComponentsButton preferredTechnology="vulcan">
          I am an orange styled button
        </StyledComponentsButton>
      </Box>
    </Container>
  );
}
