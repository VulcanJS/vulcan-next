/**
 * Demonstration of CRUD operations using smart components (SmartForm)
 *
 * /!\ at the time of writing (07/2021), this is experimental
 */
import React from "react";
import { GetStaticPropsContext } from "next";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { SmartForm, VulcanComponentsProvider } from "@vulcanjs/react-ui";
import {
  liteFormComponents,
  liteCoreComponents,
  Alert,
  Button as LiteButton,
  FormattedMessage,
  Loading,
  TooltipTrigger,
} from "@vulcanjs/react-ui-lite";
import { VulcanGraphqlModel } from "@vulcanjs/graphql";
import { ItemCard } from "~/vulcan-demo/components/ItemCard";
import { PageLayout } from "~/core/components/layout";
import models from "~/core/models";

import { useUser } from "~/account/components/hooks";
import { useMulti, useDelete } from "@vulcanjs/react-hooks";
import { routes } from "~/core/routes";

const modelsMap = models.reduce<{ [modelName: string]: VulcanGraphqlModel }>(
  (asMap, model) => ({ ...asMap, [model.name]: model }),
  {}
);
const getCurrentModel = (modelName: string): VulcanGraphqlModel => {
  // TODO: what about casing?
  const model = modelsMap[modelName];
  if (!model) {
    throw new Error(
      `No model found with name ${modelName}, but path exists. There might be an inconsistency in your getStaticPaths method.`
    );
  }
  return model;
};

/**
 * Demo basic operations for a given model
 */
export default function CrudPage({ modelName }) {
  // Auth
  /*const user = */ useUser({ redirectTo: routes.account.login.href });

  const model = getCurrentModel(modelName);

  // Read
  const documentsRawResult = useMulti<any>({
    model,
    //input: { filter: { _id: { _eq: "" } } },
  });
  const documentsResult = documentsRawResult.documents || [];

  // Select
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<
    string | undefined
  >(undefined);
  const handleSelectDocumentChange = (event) => {
    setSelectedDocumentId(event.target.value);
  };

  // Delete
  const [deleteDocument] = useDelete({ model });
  const handleDelete = async () => {
    if (!selectedDocumentId) {
      throw new Error("Trying to delete without id, this shouldn't happen");
    }
    const id = selectedDocumentId;
    setSelectedDocumentId(undefined);
    const input = {
      id,
    };
    await deleteDocument({ input });
  };

  return (
    <PageLayout>
      <VulcanComponentsProvider
        // We load additional components needed by the smart form
        // Could be replaced by your own components
        // You can also move this provider to a shared layout
        // if you have a lot of forms
        value={{
          ...liteFormComponents,
          ...liteCoreComponents,
          Button: LiteButton,
          Loading,
          TooltipTrigger,
          FormattedMessage,
          Alert,
        }}
      >
        <Typography variant="h1"> Manage {model.name}</Typography>
        <Typography variant="body1">
          /!&#92; This page is an experimental demonstration of using Vulcan
          "magic" components (SmartForm) to manage your model
        </Typography>
        <hr />
        <Typography variant="h2"> Create a new {model.name} </Typography>
        <SmartForm model={model} />
        <Typography variant="h2"> Read </Typography>
        {
          <List>
            {documentsResult.map((document) => (
              <ListItem key={document._id}>
                <ItemCard document={document} model={model} />
              </ListItem>
            ))}
          </List>
        }
        <hr />
        <Typography variant="h2">Select a document for edition</Typography>
        <FormControl>
          <InputLabel id="updateDocumentLabel">Document</InputLabel>
          <Select
            labelId="updateDocumentLabel"
            id="updatedDocumentSelectId"
            value={selectedDocumentId}
            onChange={handleSelectDocumentChange}
            style={{ minWidth: "120px" }}
          >
            <MenuItem value="">
              <em>None</em>{" "}
            </MenuItem>
            {documentsResult.map((result) => (
              <MenuItem key={result._id} value={result._id}>
                {result._id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedDocumentId && (
          <div>
            <Typography variant="h2"> Update selected document </Typography>
            <SmartForm model={model} documentId={selectedDocumentId} />

            <Typography variant="h2"> Delete select document </Typography>
            <Button color={"secondary"} onClick={() => handleDelete()}>
              Delete document
            </Button>
          </div>
        )}
      </VulcanComponentsProvider>
    </PageLayout>
  );
}

interface PathsProps {
  params: { modelName: string };
}

export async function getStaticPaths() {
  const paths = spreadPaths();

  return {
    paths,
    fallback: false,
  };
}
function spreadPaths(): Array<PathsProps> {
  const paths: Array<PathsProps> = [];
  models.forEach((model) => {
    if (!(model.name === "VulcanUser")) {
      paths.push({ params: { modelName: model.name } });
    }
  });
  return paths;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return { props: { modelName: context.params?.modelName } };
}
