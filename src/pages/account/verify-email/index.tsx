import { Box, Typography } from "@mui/material";
import { getDefaultPageLayout } from "~/components/layout/PageLayout";

export const VerifyEmailPage = () => {
  return (
    <Box
      sx={{
        mx: "auto",
        my: 2,
        p: 4,
      }}
    >
      <Typography variant="subtitle1">
        One last thing before you can log in...
      </Typography>
      <Typography>
        We've sent you an email with a verification link. Check your inbox and
        click on this link to verify your account.
      </Typography>
    </Box>
  );
};

VerifyEmailPage.getLayout = getDefaultPageLayout;

export default VerifyEmailPage;
