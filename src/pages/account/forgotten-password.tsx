import { PageLayout } from "~/components/layout";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { ErrorSuccessMessages } from "~/components/account/ErrorSuccessMessages";
import { useState } from "react";

const ForgottenPassword = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    const body = {
      email: e.currentTarget.email.value.trim(),
    };
    try {
      const res = await fetch("/api/account/send-reset-password-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status !== 200) {
        const msg = await res.text();
        setErrorMsg(msg);
      } else {
        // NOTE: this endpoint returns a success message even if the user do not exist in the db
        // this avoid leaking information about user's existence
        setSuccessMsg(
          "If this email exists in our database, we will send you an email with a link to reset your password."
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <PageLayout>
      <Typography variant="h1">Forgot your password?</Typography>
      <Typography variant="body1">
        {" "}
        Don't worry, it happens! <br />
        Enter your account's email and we will send you a password reset link.{" "}
      </Typography>
      <div className="updatePassword">
        <form onSubmit={handleSubmit}>
          <TextField
            id="updatePassword_email"
            name="email"
            type="email"
            label="Your email address"
          />
          <ErrorSuccessMessages errorMsg={errorMsg} successMsg={successMsg} />
          <Button type="submit">Send password reset email</Button>
        </form>
        <style jsx>{`
          .updatePassword {
            max-width: 21rem;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 1rem 0 0;
          }
        `}</style>
      </div>
    </PageLayout>
  );
};

export default ForgottenPassword;
