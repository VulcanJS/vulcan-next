import React from "react";
import { useUser } from "~/components/account/hooks";
import { NextMuiLink } from "@vulcanjs/next-mui";
import { Typography } from "@mui/material";
import { PageLayout } from "~/components/layout";
import { routes } from "~/lib/routes";

const AdminPage = () => {
  // TODO: this is an authenticated page, but we also would like to check the role
  /*const user = */ useUser({ redirectTo: routes.account.login.href });
  return (
    <PageLayout>
      <Typography variant="h1">Admin area</Typography>
      <Typography variant="body1">/!\ This is experimental</Typography>
      <NextMuiLink href="/admin/crud">
        <Typography>Manage your models</Typography>
      </NextMuiLink>
    </PageLayout>
  );
};

export default AdminPage;
