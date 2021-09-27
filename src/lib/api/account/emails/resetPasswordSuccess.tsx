/**
 * Email will be rendered using React Dom server rendering (renderToStaticMarkup())
 *
 * @see https://reactjs.org/docs/react-dom-server.html
 */
import ReactDOMServer from "react-dom/server";

import { Typography } from "@mui/material";
import Mail from "nodemailer/lib/mailer";

// exported only for Storybook, don't use directly this component within your app, use the function below
export const ResetPasswordSuccessEmail = () => (
  <div>
    <Typography variant="h1">Reset password success</Typography>
    <Typography>Your password has been reset successfully.</Typography>
    <Typography>
      You didn't ask for a password reset? Please reach out our Technical Teams.
    </Typography>
  </div>
);

export const resetPasswordSuccessEmailParameters = (): Partial<Mail.Options> => ({
  subject: "Password successfully reset",
  text: `Everything went fine. You didn't ask for a password reset? Please reach out our Technical Teams.`,
  html: ReactDOMServer.renderToStaticMarkup(<ResetPasswordSuccessEmail />),
});
