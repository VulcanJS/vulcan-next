import { useState } from "react";
import { GetStaticPropsContext } from "next";
import { useRouter } from 'next/router'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography
} from "@material-ui/core";
import { PageLayout } from "~/components/layout";
import { decryptToken } from "~/api/passport/iron";

export default function ResetPasswordPage({ email }) {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const [errorMsg, setErrorMsg] = useState(null as string | null);

  const resetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg(null)
    const body = {
      email,
      password: e.currentTarget.password.value
    }
    try {
      const res = await fetch("/api/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        console.log("password changed !");
      } else {
        const text = await res.text();
        setErrorMsg(text);
        throw new Error(text);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <PageLayout>
      <Typography variant="h1">Reset password</Typography>
      <div className="updatePassword">
        <form onSubmit={resetPassword}>
          <FormControl>
            <InputLabel>New password</InputLabel>
            <Input type="password" name="password" required />
          </FormControl>

          {errorMsg &&
            <p className="errorMessage"> {errorMsg} </p>}

          <Button type="submit">Reset password</Button>
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
    </PageLayout>
  );
}

interface PathsProps {
  params: { token: string };
}

export async function getStaticPaths() {
  return {
    paths: [], // No initial paths because this page is only for temporary tokens
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const token = context.params?.token;
  if (!token || Array.isArray(token)) {
    return {
      notFound: true
    };
  }

  try {
    const unsealedToken = await decryptToken(token);
    const email = unsealedToken.email;
    if (!email) {
      console.error("This token countains no email");
      return {
        notFound: true
      };
    }
    return { props: { email } };
  } catch {
    console.error("Wrong or outdated token")
    return {
      notFound: true
    };
  }
}
