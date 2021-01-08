import React from "react";
import { useMulti } from "@vulcanjs/react-hooks";
import { User } from "~/models/user";

const AdminPage = () => {
  const usersResult = useMulti({ model: User });
  const users = usersResult?.data?.vulcanUsers?.results || [];
  return (
    <div>
      <h1>Admin page</h1>
      <h2>Users</h2>
      <ul>
        {users.map(({ _id, email }) => (
          <li key={_id}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
