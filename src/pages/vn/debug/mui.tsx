import React from "react";
import { Box, Button, Typography, Container } from "@mui/material"; // Next has tree shaking
import { Link } from "@vulcanjs/next-mui";

export default function MuiPage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI
        </Typography>
        <Button>
          <Link href="/" color="secondary">
            Go to the home page
          </Link>
        </Button>
      </Box>
    </Container>
  );
}
