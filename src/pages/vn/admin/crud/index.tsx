import React from "react";
import models from "~/core/models";
import { PageLayout } from "~/core/components/layout";
import { Typography, List, ListItem } from "@mui/material";
import { Link } from "@vulcanjs/next-mui";
import { routes } from "~/core/routes";

const ModelsPage = () => {
  return (
    <PageLayout>
      <Typography variant="h1">Your models</Typography>
      <List>
        {models.map((model) => (
          <ListItem key={model.name}>
            <Link href={routes.vn.admin.crud.href + "/" + model.name}>
              <Typography sx={{ textTransform: "capitalize" }}>
                {model.name}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </PageLayout>
  );
};

export default ModelsPage;
