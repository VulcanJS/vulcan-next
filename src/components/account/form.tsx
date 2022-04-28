import Link from "next/link";
import { routes } from "~/lib/routes";

const UserForm = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Email</span>
      <input type="text" name="email" required />
    </label>
    <label>
      <span>Password</span>
      <input type="password" name="password" required />
    </label>
    {!isLogin && (
      <label>
        <span>Repeat password</span>
        <input type="password" name="rpassword" required />
      </label>
    )}
    {isLogin && (
      <div className="forgottenPassword">
        <Link href={routes.account.forgottenPassword.href}>
          <a>Forgot password?</a>
        </Link>
      </div>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href={routes.account.signup.href}>
            <a>I don't have an account</a>
          </Link>
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <Link href={routes.account.login.href}>
            <a>I already have an account</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-content: space-between;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .forgottenPassword {
        margin: 0 0rem 0.2rem;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
);

export default UserForm;
