import React from "react";
import { useMulti } from "@vulcanjs/react-hooks";
import { User } from "~/models/user";
import { useUser } from "~/components/user/hooks";

const AdminPage = () => {
  // TODO: this is an authenticated page, but we also would like to check the role
  const user = useUser({ redirectTo: "/login" });
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
