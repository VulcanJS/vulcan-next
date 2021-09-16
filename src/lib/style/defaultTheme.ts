import colors from "./colors";
// Mui theme
// @see https://material-ui.com/customization/default-theme
// @see https://github.com/mui-org/material-ui/issues/20787
// @see https://github.com/vercel/styled-jsx/issues/142
import { createTheme, adaptV4Theme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme(adaptV4Theme({
  palette: {
    background: {
      default: colors.white,
    },
    text: {
      primary: colors.greyVulcan,
    },
  },
}));

export default theme;
