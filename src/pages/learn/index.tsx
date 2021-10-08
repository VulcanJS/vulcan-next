import { Box, Typography } from "@mui/material";

const Learn = () => {
  const isLocalhost = window.location.hostname.match("/localhost/");
  const isOfficialWebsite =
    !isLocalhost && window.location.hostname.match(/vulcan-next/);
  return (
    <Box>
      <Typography>Welcome to Vulcan!</Typography>
    </Box>
  );
};
export default Learn;
