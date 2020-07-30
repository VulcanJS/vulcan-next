import { Link } from "@vulcan/next-material-ui"; // "next/link";
import { List, ListItem, Typography } from "@material-ui/core";
import entries from "../../../docs/entries";

const DocIndex = ({ pages = [] }) => (
  <div style={{ margin: "32px auto", maxWidth: "1200px" }}>
    <Typography variant="h1">VNS Documentation</Typography>
    <List>
      {pages.map((pageName) => (
        <Link href={`/docs/${pageName}`}>
          <ListItem button key={pageName}>
            <Typography style={{ textTransform: "capitalize" }}>
              {pageName}
            </Typography>
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
);

export const getStaticProps = async () => {
  const pages = Object.keys(entries);
  return { props: { pages } };
};

export default DocIndex;
