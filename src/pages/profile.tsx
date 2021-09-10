import { useUser } from "~/components/user/hooks";
import { PageLayout } from "~/components/layout";
import ChangePasswordForm from "~/components/user/ChangePassword";
import { Typography } from "@material-ui/core";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });
  if (!user) return null; // will redirect
  console.log(user);
  return (
    <PageLayout>
      <Typography variant="h1">Your profile</Typography>
      <p>
        <Typography>Logged in as {user.email}</Typography>
      </p>
      <ChangePasswordForm user={user} />
    </PageLayout>
  );
};

export default Profile;
