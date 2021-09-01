import React from "react";
import { useRouter } from 'next/router'
import {
  Button,
  Typography
} from "@material-ui/core";
import { PageLayout } from "~/components/layout";

export default function VerifyEmailPage() {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback && !router.isReady) {
    return <div>Loading...</div>
  }

  const { token } = router.query;

  // TODO: reused from reset-password
  const verifyEmail = async (evt) => {
    evt.preventDefault()
    // setErrorMsg(null);
    const body = {
      token,
    };
    try {
      const res = await fetch("/api/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        console.log("email verified !");
      } else {
        const text = await res.text();
        // setErrorMsg(text);
        throw new Error(text);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // setErrorMsg(error.message);
    }

  }

  return (
    <PageLayout>
      <Typography variant="h1">Verify Email</Typography>
      <Button onClick={verifyEmail}>Click to verify</Button>
      <hr />
      <Typography variant="body1">Token: {token}</Typography>
    </PageLayout>
  );
}

interface PathsProps {
  params: { token: string };
}

export async function getStaticPaths() {
  return {
    paths: [], // No initial paths because this page is only for temporary tokens
    fallback: true,
  };
}