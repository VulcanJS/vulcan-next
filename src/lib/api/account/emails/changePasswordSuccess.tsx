/**
 * Email will be rendered using React Dom server rendering (renderToStaticMarkup())
 *
 * @see https://reactjs.org/docs/react-dom-server.html
 */
import ReactDOMServer from "react-dom/server";

import { Typography } from "@mui/material";
import Mail from "nodemailer/lib/mailer";

// exported only for Storybook, don't use directly this component within your app, use the function below
export const ChangePasswordSuccessEmail = () => (
  <div>
    <Typography variant="h1">Password changed</Typography>
    <Typography>Your password has been changed successfully.</Typography>
    <Typography>
      You didn't ask for a password change? Please reach out our Technical
      Teams.
    </Typography>
  </div>
);

export const changePasswordSuccessEmailParameters = (): Partial<Mail.Options> => ({
  subject: "Here is your password reset link",
  text: `Your password has been changed successfully. You didn't ask for a password change? Please reach out our Technical Teams.`,
  html: ReactDOMServer.renderToStaticMarkup(<ChangePasswordSuccessEmail />),
});
