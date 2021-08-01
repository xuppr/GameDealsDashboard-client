import "./RegistrationPage.css";
import { useMutation, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  CREATE_USER_MUTATION,
  TOKEN_AUTH_MUTATION,
} from "../../queries/queries";

function RegistrationPage({ username, setUsername }) {
  const client = useApolloClient(); // per login mutation
  const [createUser, { error, data }] = useMutation(CREATE_USER_MUTATION);
  const [loginError, setLoginError] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    if (!(data || error)) {
      return;
    }

    if (data) {
      setTimeout(() => {
        client
          .mutate({
            mutation: TOKEN_AUTH_MUTATION,
            variables: {
              username: inputUsername,
              password: inputPassword,
            },
          })
          .then((res) => {
            localStorage.setItem("token", res.data.tokenAuth.token);
            setUsername(res.data.tokenAuth.payload.username);
          })
          .catch((err) => {
            console.log(err);
            setLoginError(true);
          });

        setInputUsername("");
        setInputPassword("");
      }, 1000);
    }
  }, [data, error]);

  if (username) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser({
      variables: {
        username: inputUsername,
        password: inputPassword,
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="registration-page">
      <h1>Register Here</h1>
      {error ? <p style={{ color: "red" }}>Try something different!</p> : null}
      {data && !loginError ? (
        <p style={{ color: "green" }}>User Created! Logging In...</p>
      ) : null}
      {loginError ? <p style={{ color: "red" }}>Unable to login...</p> : null}
      <form onSubmit={handleSubmit} className="registration-form">
        <div>
          <label>Username: </label>
          <input
            disabled={data ? true : false}
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Password: </label>
          <input
            disabled={data ? true : false}
            type="text"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          ></input>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
