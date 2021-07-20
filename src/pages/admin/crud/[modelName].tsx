import React from "react";
import { GetStaticPropsContext } from 'next'
import { VulcanGraphqlModel } from "@vulcanjs/graphql";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { SmartForm } from "@vulcanjs/react-ui"
import models from "~/models";

import { getReadableFields } from "@vulcanjs/schema";
import { useUser } from "~/components/user/hooks";
import {
    useMulti,
    useDelete
} from "@vulcanjs/react-hooks";

export default function CrudPage({ modelName }) {
    // Auth
    const user = useUser({ redirectTo: "/login" });

    // Model
    const getCurrentModel = (modelName: string) => {
        const model = models.find(model => model.name === modelName);
        if (!model) { // Shouldn't be reachable thanks to getStaticPaths
            throw new Error(
                "No model found with this name, please use the index if you don't know the model name."
            );
        }
        return model;
    }
    const model: VulcanGraphqlModel = getCurrentModel(modelName);

    // Read
    const readFields = getReadableFields(model.schema);
    const documentsRawResult = useMulti({ model });
    const documentsResult = documentsRawResult.documents || []

    // Select
    const [selectedDocumentId, setSelectedDocumentId] = React.useState('');
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
        setSelectedDocumentId('')
        const input = {
            id
        };
        await deleteDocument({ input });
    }

    return (
        <div>
            <h1> {model.name} Crud page</h1>
            <h2> Create </h2>
            <SmartForm
                model={model}
            />

            <h2> Read </h2>
            {<ul>
                {documentsResult.map((result) => (
                    <li key={result._id}>
                        {readFields.map((field) => (
                            result[field]
                                ? <p key={result._id + field}> <strong>{field}:</strong> {result[field]} </p>
                                : null
                        ))}
                    </li>
                ))}
            </ul>}

            <hr />

            <h2> Choose your document</h2>
            <FormControl>
                <InputLabel id="updateDocumentLabel" >
                    Document
                </InputLabel>
                <Select
                    labelId="updateDocumentLabel"
                    id="updatedDocumentSelectId"
                    value={selectedDocumentId}
                    onChange={handleSelectDocumentChange}
                    style={{ minWidth: '120px' }}
                >
                    <MenuItem value=''><em>None</em> </MenuItem>
                    {documentsResult.map((result) => (
                        <MenuItem
                            key={result._id}
                            value={result._id}
                        >
                            {result._id}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedDocumentId && (
                <div>
                    <h2> Update </h2>
                    <SmartForm
                        model={model}
                        documentId={selectedDocumentId}
                    />

                    <h2> Delete </h2>
                    <Button color={'secondary'} onClick={() => handleDelete()}> Delete document</Button>

                </div>
            )}
        </div>
    );
};


interface PathsProps {
    params: { modelName: string }
}

export async function getStaticPaths() {
    const paths = spreadPaths();

    return {
        paths,
        fallback: false
    };
}
function spreadPaths(): Array<PathsProps> {
    const paths: Array<PathsProps> = [];
    models.forEach(model => {
        paths.push({ params: { modelName: model.name } });
    });
    return paths;
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return { props: { modelName: context.params?.modelName } };
}