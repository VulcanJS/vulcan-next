import React from "react";
import { useUser } from "~/components/user/hooks";
import { NextMuiLink } from "@vulcanjs/next-material-ui";
import { Typography } from "@material-ui/core";
import { PageLayout } from "~/components/layout";

const AdminPage = () => {
  // TODO: this is an authenticated page, but we also would like to check the role
  /*const user = */ useUser({ redirectTo: "/login" });
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
