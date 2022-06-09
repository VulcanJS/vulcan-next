import { useUser } from "~/account/components/hooks";
import { PageLayout } from "~/core/components/layout";
import ChangePasswordForm from "~/account/components/ChangePassword";
import { Typography } from "@mui/material";
import { routes } from "~/core/routes";

const Profile = () => {
  const user = useUser({ redirectTo: routes.account.login.href });
  if (!user) return null; // will redirect
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
