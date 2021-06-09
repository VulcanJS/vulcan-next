import { useEffect, useState } from "react";
import { useUser } from "../components/user/hooks";
/**
 * Version that uses Meteor backend
 */
import { VulcanMeteorHooks } from "@vulcanjs/meteor-legacy";
const { useAuthenticateWithPassword } = VulcanMeteorHooks;

import Layout from "~/components/user/layout";
import Form from "~/components/user/form";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  /**
   * Version that uses Meteor backend
   */
  const [login] = useAuthenticateWithPassword();

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      /**
       * Version that uses Next backend
       */
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      /**
       * Version that uses Meteor backend
       */
      const res = await login({
        input: { email: body.username, password: body.password },
      });
      res.status = 200; // mock an HTTP request, just so we get the same API as for Next

      if (res.status === 200) {
        // @see https://github.com/vercel/next.js/discussions/19601
        // This force SWR to update all queries subscribed to "api/user"
        window.location.replace("/");
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
