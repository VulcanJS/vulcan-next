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
} from "@material-ui/core";
import { SmartForm } from "@vulcanjs/react-ui";
import { VulcanGraphqlModel } from "@vulcanjs/graphql";
import { ItemCard } from "~/components/vns/ItemCard";
import { PageLayout } from "~/components/layout";
import models from "~/models";

import { useUser } from "~/components/user/hooks";
import { useMulti, useDelete } from "@vulcanjs/react-hooks";

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
  /*const user = */ useUser({ redirectTo: "/login" });

  const model = getCurrentModel(modelName);

  // Read
  const documentsRawResult = useMulti({ model });
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
      <Typography variant="h1"> Manage {model.name}</Typography>
      <Typography variant="body1">
        /!\ This page is an experimental demonstration of using Vulcan "magic"
        components (SmartForm) to manage your model
      </Typography>
      <hr />
      <Typography variant="h2"> Create a new {model.name} </Typography>
      <SmartForm model={model} />
      <Typography variant="h2"> Read </Typography>
      {
        <List>
          {documentsResult.map((document) => (
            <ListItem key={document.id}>
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
