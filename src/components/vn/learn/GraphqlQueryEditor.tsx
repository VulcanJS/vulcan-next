import { gql, useQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

// trick to prevent query creation failure when query is not valid yet
const toGql = (query) => {
  try {
    return {
      gqlQuery: gql`
        ${query}
      `,
      valid: true,
    };
  } catch (e) {
    return {
      gqlQuery: gql`
        {
          __typename
        }
      `,
      valid: false,
    }; // simplest valid query
  }
};
export const GraphqlQueryEditor = ({
  initialQuery = "",
}: {
  initialQuery?: string;
}) => {
  const [init, setInit] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const { gqlQuery, valid } = toGql(query);
  const { data, error, loading } = useQuery(gqlQuery, {
    skip: !(query && valid && !init),
  });
  const onSubmit = (evt) => {
    evt.preventDefault();
    setQuery(evt.target["query"].value);
    // trigger query after first click only (note: we could use a useLazyQuery as well)
    if (init) {
      setInit(false);
    }
  };
  return (
    <Box>
      <Box>
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <TextareaAutosize
            style={{ width: "100%" }}
            name="query"
            defaultValue={query}
          />
          <Box>
            <Button sx={{ width: "100%" }} type="submit" variant="contained">
              Send query
            </Button>
          </Box>
        </form>
      </Box>
      <Box>
        {error && (
          <Box sx={{ color: "error.main" }}>Error: {error.message}</Box>
        )}
        {!valid && <Box sx={{ color: "warning.main" }}>Invalid query</Box>}
        {data && (
          <Box sx={{ bgcolor: "warn.main" }}>
            <Typography variant="subtitle2">Result:</Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Box>
  );
};
