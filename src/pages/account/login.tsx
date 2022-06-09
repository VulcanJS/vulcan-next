import { useState } from "react";
import { useUser } from "~/account/components/hooks";
import Layout from "~/account/components/layout";
import Form from "~/account/components/form";
import { apiRoutes } from "~/core/server/apiRoutes";
import { useRouter } from "next/router";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const router = useRouter();
  const redirectedFrom = router.query?.from as string;

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch(apiRoutes.account.login.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        // @see https://github.com/vercel/next.js/discussions/19601
        // This force SWR to update all queries subscribed to "user"
        window.location.replace(redirectedFrom || "/");
        // Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Login;
