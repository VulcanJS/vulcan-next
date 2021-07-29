import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";

function ChangePasswordForm(props: { user: { email: string; } }) {
  const [errorMsg, setErrorMsg] = useState(null as string | null);

  async function handleSubmit(e) {
    e.preventDefault();
    const oldPassword = e.currentTarget.oldPassword.value;
    const newPassword = e.currentTarget.newPassword.value;

    if (newPassword !== e.currentTarget.confirmNewPassword.value) {
      setErrorMsg("passwords don't match")
    } else {
      setErrorMsg(null)

      // First, see if the old password is the good one by login the user again
      const loginCredits = {
        username: props.user.email,
        password: oldPassword,
      };
      try {
        const resLogin = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginCredits),
        });

        if (resLogin.status === 200) {
          // Then, change the user's password
          const body = {
            password: newPassword
          }

          const resChangePassword = await fetch("/api/changePassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          if (resChangePassword.status === 200) {
            console.log("password changed !");
          } else {
            // Can't change the password
            const text = await resChangePassword.text();
            setErrorMsg(text);
            throw new Error(text);
          }
        } else {
          // Can't login
          const text = await resLogin.text();
          setErrorMsg(text);
          throw new Error(text);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setErrorMsg(error.message);
      }
    }
  }


  return (
    <div className="updatePassword">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel>Old password</InputLabel>
          <Input type="password" name="oldPassword" required />
        </FormControl>
        <FormControl>
          <InputLabel>New password</InputLabel>
          <Input type="password" name="newPassword" required />
        </FormControl>
        <FormControl>
          <InputLabel>Confirm new password</InputLabel>
          <Input type="password" name="confirmNewPassword" required />
        </FormControl>

        {errorMsg &&
          <p className="errorMessage"> {errorMsg} </p>}

        <Button type="submit">Update password</Button>
      </form>
      <style jsx>{`
        .updatePassword {
          max-width: 21rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin: 1rem 0 0;
        }
        .errorMessage{
          color: red;
          margin: 0 0 0;
        }
      `}</style>
    </div>
  );
};

export default ChangePasswordForm;