import { useState } from "react";
import Router from "next/router";
/**
 * Version that uses Next backend
 */
import { useUser } from "~/components/user/hooks";
import Layout from "~/components/user/layout";
import UserForm from "~/components/user/form";
/**
 * Version that uses Meteor backend
 */
import { VulcanMeteorHooks } from "@vulcanjs/meteor-legacy";
const { useSignup } = VulcanMeteorHooks;

const Signup = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  /**
   * Version that uses Meteor backend
   */
  const [signup] = useSignup();

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      /**
       * Version that uses Next backend
       */
      // const res = await fetch("/api/signup", {
      // method: "POST",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(body),
      // });
      /**
       * Version that uses Meteor backend
       */
      const res = await signup({
        input: { email: body.email, password: body.password },
      });
      res.status = 200; // mock an HTTP request, just so we get the same API as for Next

      if (res.status === 200) {
        Router.push("/login");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <UserForm
          isLogin={false}
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
        />
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

export default Signup;
