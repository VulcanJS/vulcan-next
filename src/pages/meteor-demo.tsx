import {
  useCreate,
  useDelete,
  useMulti,
  useSingle,
  useUpdate,
} from "@vulcanjs/react-hooks";
import { SmartForm } from "@vulcanjs/react-ui";
import { useState } from "react";
import { useUser } from "~/components/user/hooks";
import { VulcanResource, VulcanResourceType } from "../models/vulcanResource";

const DocumentsList = ({ setSelectedDocumentId, selectedDocumentId }) => {
  const { documents, loading, error } = useMulti({ model: VulcanResource });
  const [deleteDocument] = useDelete({ model: VulcanResource });
  if (loading) return <p>Loading documents...</p>;
  if (error) return <p>Could not get documents {JSON.stringify(error)}</p>;
  if (!documents) return <p>Error, documents undefined</p>;
  if (!documents?.length)
    return <p>No documents to show, create a new document using the form</p>;
  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc._id}>
          <button
            onClick={() => {
              if (setSelectedDocumentId) {
                setSelectedDocumentId(doc._id);
              }
            }}
          >
            Select
          </button>
          Document: {JSON.stringify(doc, null, 2)}
          <button
            onClick={async () => {
              if (selectedDocumentId === doc._id) {
                // unselect
                setSelectedDocumentId(undefined);
              }
              await deleteDocument({ input: { id: doc._id } });
            }}
            aria-label={`Delete document ${doc._id}`}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
const SelectedDocument = ({
  selectedDocumentId,
}: {
  selectedDocumentId?: string;
}) => {
  const { document, loading, error } = useSingle({
    model: VulcanResource,
    input: {
      id: selectedDocumentId
    },
    queryOptions: {
      skip: !selectedDocumentId, // do not trigger if no document is selected
    },
  });
  if (!selectedDocumentId)
    return <p>No document selected, click on one item of the list.</p>;
  if (loading) return <p>Loading single document...</p>;
  if (error)
    return <p>Could not load single document {JSON.stringify(error)}</p>;
  if (!document) return <p>Error, document not found</p>;
  return <p>Document: ${JSON.stringify(document, null, 2)}</p>;
};

const CreateDocument = () => {
  const [createDocument] = useCreate({ model: VulcanResource });
  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const name = (evt.target as any).name.value;
        const url = (evt.target as any).url.value;
        await createDocument({ input: { data: { name, url } } });
      }}
    >
      <input placeholder="name" type="text" name="name" />
      <input placeholder="url" type="text" name="url" />
      <button type="submit">Create</button>
    </form>
  );
};
const UpdateDocument = ({ selectedDocumentId }) => {
  const { document, loading, error } = useSingle<VulcanResourceType>({
    model: VulcanResource,
    queryOptions: {
      skip: !selectedDocumentId, // do not trigger if no document is selected
    },
  });
  const [updateDocument] = useUpdate({ model: VulcanResource });

  if (!selectedDocumentId)
    return <p>No document selected, click on one item of the list.</p>;
  if (loading) return <p>Loading single document...</p>;
  if (error)
    return <p>Could not load single document {JSON.stringify(error)}</p>;
  if (!document) return <p>Error, document not found</p>;
  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const name = (evt.target as any).name.value;
        const url = (evt.target as any).url.value;
        await updateDocument({
          input: { id: selectedDocumentId, data: { name, url } },
        });
      }}
    >
      <input
        placeholder="name"
        type="text"
        name="name"
        defaultValue={document.name}
      />
      <input
        placeholder="url"
        type="text"
        name="url"
        defaultValue={document.url}
      />
      <button type="submit">Update</button>
    </form>
  );
};

const MeteorDemo = () => {
  // const [] = useSingle();
  // const [] = useCreate();
  // const [] = useUpdate();
  // const [] = useDelete();
  const [selectedDocumentId, setSelectedDocumentId] = useState<
    string | undefined
  >(undefined);
  const user = useUser();
  return (
    <div>
      <h1>
        Demonstration of consuming a Vulcan Meteor collection in your Vulcan
        Next frontend
      </h1>
      {!!user ? (
        <p>You are logged in {JSON.stringify(user)}</p>
      ) : (
        <p>
          You are not logged in, creation form and update form won't work. You
          can login <a href="/login">at /login page.</a>
        </p>
      )}
      <p></p>
      <h2>useMulti + useDelete</h2>
      <DocumentsList
        selectedDocumentId={selectedDocumentId}
        setSelectedDocumentId={setSelectedDocumentId}
      />
      <h2>useSingle</h2>
      <SelectedDocument selectedDocumentId={selectedDocumentId} />
      <h2>useCreate</h2>
      <CreateDocument />
      <h2>Smart from - creation</h2>
      <SmartForm model={VulcanResource} currentUser={user} />
      <h2>useUpdate</h2>
      <UpdateDocument selectedDocumentId={selectedDocumentId} />
      <h2>Smart form - update</h2>
      {selectedDocumentId ? (
        <SmartForm
          model={VulcanResource}
          documentId={selectedDocumentId}
          currentUser={user}
        />
      ) : (
        <p>
          Please create at least one document and then select a document in the
          list
        </p>
      )}
    </div>
  );
};
export default MeteorDemo;
