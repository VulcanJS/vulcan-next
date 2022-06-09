/**
 * Email will be rendered using React Dom server rendering (renderToStaticMarkup())
 *
 * @see https://reactjs.org/docs/react-dom-server.html
 */
import ReactDOMServer from "react-dom/server.js";

import { Typography } from "@mui/material";
import Mail from "nodemailer/lib/mailer";

// exported only for Storybook, don't use directly this component within your app
// If you update this component, don't forget to also update the text version below
export const VerifyEmailEmail = ({ verificationUrl }) => (
  <div>
    <Typography variant="h1">Email verification</Typography>
    <Typography>
      Click on this link to confirm that you own this email address:
      {verificationUrl}
    </Typography>
    <Typography>
      You didn't sign up to our service? Please reach out our Technical Teams.
    </Typography>
  </div>
);

export const verifyEmailEmailParameters = ({
  verificationUrl,
}): Partial<Mail.Options> => ({
  subject: "Email verification",
  text: `
    Click on this link to confirm that you own this email address:
    ${verificationUrl}. You didn't sign up to our service? Please reach out our Technical Teams.`,
  html: ReactDOMServer.renderToStaticMarkup(
    <VerifyEmailEmail verificationUrl={verificationUrl} />
  ),
});
