import { useUser } from "~/components/user/hooks";
import { PageLayout } from "~/components/layout";
import ChangePasswordForm  from "~/components/user/changePassword";
import {
  Typography,
} from "@material-ui/core";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });

  return (
    <PageLayout>
      <Typography variant='h1'>Profile</Typography>
      <Typography variant='h2'> Password Update: </Typography>
      <ChangePasswordForm user={user} />

      <Typography variant='h2'> Your session: </Typography>
      <Typography variant='body1'> {JSON.stringify(user)} </Typography>
    </PageLayout>
  );
};

export default Profile;
