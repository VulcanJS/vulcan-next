/**
 * TODO: in Vulcan Meteor we already have a Card component, we will need to make it
 * available in Vulcan NPM as well
 *
 * This component will be removed when this is done
 */

import { getReadableFields } from "@vulcanjs/schema";

export const ItemCard = ({ document, model }) => {
  const readableFields = getReadableFields(model.schema);
  return (
    <div>
      {readableFields.map((field) =>
        document[field] ? (
          <p key={document._id + field}>
            <strong>{field}:</strong> {document[field]}
          </p>
        ) : null
      )}
    </div>
  );
};
