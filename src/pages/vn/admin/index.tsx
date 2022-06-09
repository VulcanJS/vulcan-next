import React from "react";
import { useUser } from "~/account/components/hooks";
import { NextMuiLink } from "@vulcanjs/next-mui";
import { Typography } from "@mui/material";
import { PageLayout } from "~/core/components/layout";
import { routes } from "~/core/routes";

const AdminPage = () => {
  // TODO: this is an authenticated page, but we also would like to check the role
  /*const user = */ useUser({
    redirectTo: routes.account.login.href,
    rememberCurrentRoute: true,
  });
  return (
    <PageLayout>
      <Typography variant="h1">Admin area</Typography>
      <Typography variant="body1">/!\ This is experimental</Typography>
      <NextMuiLink href={routes.vn.admin.crud.href}>
        <Typography>Manage your data</Typography>
      </NextMuiLink>
    </PageLayout>
  );
};

export default AdminPage;
