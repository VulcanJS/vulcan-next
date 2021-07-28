import React from "react";
import { GetStaticPropsContext } from "next";
import { useRouter } from 'next/router'
import {
  Button,
  Typography
} from "@material-ui/core";
import { PageLayout } from "~/components/layout";
import { decryptToken } from "~/api/passport/iron";

export default function VerifyEmailPage({ token, email }) {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const verifyEmail = async () => {
    // Put your code here
  }

  return (
    <PageLayout>
      <Typography variant="h1">Verify Email</Typography>
      <Button onClick={verifyEmail}>Click to verify</Button>
      <hr />
      <Typography variant="body1">Email: {email} <br /> <br /> Token: {token}</Typography>
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const token = context.params?.token;
  if (!token || Array.isArray(token)) {
    return {
      notFound: true
    };
  }

  try {
    const unsealedToken = await decryptToken(token);
    const email = unsealedToken.email;
    if (!email) {
      console.error("This token countains no email");
      return {
        notFound: true
      };
    }
    return { props: { token, email } };
  } catch {
    console.error("Wrong or outdated token")
    return {
      notFound: true
    };
  }
}
