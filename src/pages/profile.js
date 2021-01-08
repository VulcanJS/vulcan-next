import { useUser } from "~/components/user/hooks";
import Layout from "~/components/user/layout";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });

  return (
    <Layout>
      <h1>Profile</h1>
      {user && <p>Your session: {JSON.stringify(user)}</p>}
    </Layout>
  );
};

export default Profile;
