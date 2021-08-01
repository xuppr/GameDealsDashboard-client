import "./LoginPage.css";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { TOKEN_AUTH_MUTATION } from "../../queries/queries";
import { Link } from "react-router-dom";

export default function LoginPage({ username, setUsername }) {
  const [tokenAuth, { error, data }] = useMutation(TOKEN_AUTH_MUTATION);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    if (!(data || error)) {
      return;
    }

    if (data) {
      localStorage.setItem("token", data.tokenAuth.token);
      setUsername(data.tokenAuth.payload.username);
    }

    setInputUsername("");
    setInputPassword("");
  }, [data, error]);

  if (username) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    tokenAuth({
      variables: { username: inputUsername, password: inputPassword },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="login-page">
      <h1>Login: </h1>
      {error ? <p style={{ color: "red" }}>Wrong Credentials!</p> : null}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          ></input>
        </div>

        <p>
          Don't have an account? Register <Link to="/register">here</Link>
        </p>

        <button type="submit">continue</button>
      </form>
    </div>
  );
}
