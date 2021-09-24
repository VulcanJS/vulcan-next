import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Typography, TextField } from "@mui/material";
import { PageLayout } from "~/components/layout";
import { ErrorSuccessMessages } from "~/components/account/ErrorSuccessMessages";
import { routes } from "~/lib/routes";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState(null as string | null);
  const [successMsg, setSuccessMsg] = useState(null as string | null);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback || !router.isReady) {
    return <div>Loading...</div>;
  }

  const { token } = router.query;

  const resetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const body = {
      token,
      newPassword: e.currentTarget.newPassword.value,
    };
    try {
      const res = await fetch("/api/account/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        setSuccessMsg(
          "Password reset successfully! You will be redirected to login page in one second..."
        );
        setTimeout(() => {
          router.push(routes.account.login.href);
        }, 500);
      } else {
        const text = await res.text();
        setErrorMsg(text);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <PageLayout>
      <Typography variant="h1">Reset password</Typography>
      <div className="updatePassword">
        <form onSubmit={resetPassword}>
          <TextField
            id="resetPassword_newPassword"
            name="newPassword"
            label="New password"
            required
          />
          <ErrorSuccessMessages errorMsg={errorMsg} successMsg={successMsg} />
          <Button type="submit">Reset password</Button>
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
}
