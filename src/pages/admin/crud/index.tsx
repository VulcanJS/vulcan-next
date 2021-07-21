import React from "react";
import models from "~/models";
import { PageLayout } from "~/components/layout";
import { Typography, List, ListItem } from "@material-ui/core";
import { Link } from "@vulcanjs/next-material-ui";

const ModelsPage = () => {
  return (
    <PageLayout>
      <Typography variant="h1">Your models</Typography>
      <List>
        {models.map((model) => (
          <ListItem key={model.name}>
            <Link href={"/admin/crud/" + model.name}>
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
