import { Box, Typography } from "@mui/material";

export const VerifyEmailPage = () => {
  return (
    <Box>
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

export default VerifyEmailPage;
