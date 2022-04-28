import React, { ReactElement, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { apiRoutes } from "~/lib/api/apiRoutes";
import { useRouter } from "next/router";
import { PageLayout } from "~/components/layout";
import { routes } from "~/lib/routes";

const useToken = () => {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback && !router.isReady) {
    return { loading: true };
  }
  const { token } = router.query;
  return { token, loading: false };
};
export const VerifyEmailTokenPage = () => {
  const { loading: loadingToken, token } = useToken();
  const [msg, setMsg] = useState<string>(
    "We are verifying your token, it make take a few seconds..."
  );
  const router = useRouter();
  useEffect(() => {
    if (loadingToken) return;
    if (!token) {
      setMsg("Token not found! Your verification link seems incomplete.");
      return;
    }
    const verifyToken = async () => {
      const body = { token };
      const res = await fetch(apiRoutes.account.verifyEmail.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setMsg(
          "Your email has been successfully verified! We will redirect you to the login page..."
        );
        router.push(routes.account.login.href + "?s=verified");
      } else {
        const text = await res.text();
        // setErrorMsg(text);
        throw new Error(text);
      }
    };
    verifyToken();
  }, [loadingToken, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageLayout>
      <Box>
        <Typography>{msg}</Typography>
      </Box>
    </PageLayout>
  );
};

VerifyEmailTokenPage.getLayout = function (page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
export default VerifyEmailTokenPage;
