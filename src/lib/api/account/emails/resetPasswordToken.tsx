/**
 * Email will be rendered using React Dom server rendering (renderToStaticMarkup())
 *
 * @see https://reactjs.org/docs/react-dom-server.html
 */
import ReactDOMServer from "react-dom/server";

import { Typography } from "@mui/material";
import Mail from "nodemailer/lib/mailer";

// exported only for Storybook, don't use directly this component within your app
export const ResetPasswordTokenEmail = ({ resetUrl }) => (
  <div>
    <Typography variant="h1">Reset your password</Typography>
    <Typography>
      Click on this link to access the password reset interface: {resetUrl}
    </Typography>
    <Typography>
      You didn't ask for a password reset? Please reach out our Technical Teams.
    </Typography>
  </div>
);

export const resetPasswordTokenEmailParameters = ({
  resetUrl,
}): Partial<Mail.Options> => ({
  subject: "Here is your password reset link",
  text: `Click on this link to access the password reset interface: ${resetUrl}. You didn't ask for a password reset? Please reach out our Technical Teams.`,
  html: ReactDOMServer.renderToStaticMarkup(
    <ResetPasswordTokenEmail resetUrl={resetUrl} />
  ),
});
