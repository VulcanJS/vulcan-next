import { Dispatch, useReducer, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { ErrorSuccessMessages } from "./ErrorSuccessMessages";
import { apiRoutes } from "~/lib/api/apiRoutes";

interface State {
  errorMsg: string | null;
  successMsg: string | null;
  loading: boolean;
}
type Action =
  | {
      type: "setErrorMessage";
      payload: string | null;
    }
  | { type: "setSuccessMessage"; payload: string | null }
  | { type: "setLoading"; payload: boolean };

export interface ChangePasswordProps {
  // @see https://stackoverflow.com/questions/56322667/how-to-type-a-form-component-with-onsubmit
  handleSubmit: (evt: React.FormEvent) => any;
  state: State;
  dispatch: Dispatch<Action>;
}
export const ChangePasswordForm = ({
  handleSubmit,
  state,
  dispatch,
}: ChangePasswordProps) => {
  const { errorMsg, successMsg, loading } = state;
  return (
    <div className="updatePassword">
      <Typography variant="h2">Update your password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Old password"
          type="password"
          id="updatePassword_oldPassword" // id is needed for accessibility
          name="oldPassword"
          required
        />
        <TextField
          label="New password"
          type="password"
          id="updatePassword_newPassword"
          name="newPassword"
          required
        />
        <TextField
          label="Confirm new password"
          type="password"
          id="updatePassword_confirmNewPassword"
          name="confirmNewPassword"
          required
        />

        <ErrorSuccessMessages errorMsg={errorMsg} successMsg={successMsg} />

        <Button type="submit" disabled={loading}>
          Update password
        </Button>
      </form>
      <style jsx>{`
        /** Global is necessary for restyling existing components like Material UI components */
        form :global(.MuiTextField-root) {
          margin: 4px;
        }
        .updatePassword {
          max-width: 21rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin: 1rem 0 0;
        }
      `}</style>
    </div>
  );
};

// reducer is exported for testing purpose
export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setErrorMessage": {
      return { ...state, errorMsg: action.payload };
    }
    case "setSuccessMessage": {
      return { ...state, successMsg: action.payload };
    }
    case "setLoading": {
      return { ...state, loading: action.payload };
    }
    default:
      throw new Error(`Unknown action ${action}`);
  }
};
// initialState is exported for testing purpose
export const initialState = {
  errorMsg: null,
  successMsg: null,
  loading: false,
};

const ChangePasswordFormContainer = (props: { user: { email: string } }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { errorMsg, successMsg, loading } = state;

  async function handleSubmit(e) {
    e.preventDefault();
    if (errorMsg) dispatch({ type: "setErrorMessage", payload: null });
    const oldPassword = e.currentTarget.oldPassword.value;
    const newPassword = e.currentTarget.newPassword.value;
    const confirmedPassword = e.currentTarget.confirmNewPassword.value;

    if (newPassword !== confirmedPassword) {
      dispatch({ type: "setErrorMessage", payload: "Passwords don't match" });
    } else {
      dispatch({ type: "setLoading", payload: true });
      try {
        // Then, change the user's password
        const body = {
          oldPassword: oldPassword,
          newPassword: newPassword,
        };

        const resChangePassword = await fetch(
          apiRoutes.account.changePassword.href,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        if (resChangePassword.status === 200) {
          dispatch({
            type: "setSuccessMessage",
            payload: "Password successfully updated",
          });
        } else {
          // Can't change the password
          const text = await resChangePassword.text();
          dispatch({ type: "setErrorMessage", payload: text });
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        dispatch({ type: "setErrorMessage", payload: error.message });
      } finally {
        dispatch({ type: "setLoading", payload: false });
      }
    }
  }

  return (
    <ChangePasswordForm
      handleSubmit={handleSubmit}
      state={state}
      dispatch={dispatch}
    />
  );
};

export default ChangePasswordFormContainer;
