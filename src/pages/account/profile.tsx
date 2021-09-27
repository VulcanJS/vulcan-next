import { useUser } from "~/components/account/hooks";
import { PageLayout } from "~/components/layout";
import ChangePasswordForm from "~/components/account/ChangePassword";
import { Typography } from "@mui/material";
import { routes } from "~/lib/routes";

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
