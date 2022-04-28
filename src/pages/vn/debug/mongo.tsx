import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
const MongoDebugPage = () => {
  const { data, loading, error } = useQuery(
    gql`
      query restaurants {
        restaurants {
          _id
          name
        }
      }
    `
  );
  if (loading) return <>Thinking about restaurants...</>; // NOTE: in TypeScript with React we can't return just a string
  if (error)
    return (
      <div>
        I could not remember any restaurant, sorry... Error: {error.message}
      </div>
    );

  const { restaurants } = data;

  return (
    <div>
      <h2>First 5 restaurants that comes to my mind:</h2>
      <ul className="restaurants">
        {restaurants.map(({ _id, name }) => (
          <li key={_id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
export default MongoDebugPage;
