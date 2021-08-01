import { useMutation, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  CREATE_USER_MUTATION,
  TOKEN_AUTH_MUTATION,
} from "../../queries/queries";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";

export default function RegistrationPage({ username, setUsername }) {
  const client = useApolloClient(); // per login mutation
  const [createUser, { error, data }] = useMutation(CREATE_USER_MUTATION);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

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

    if (inputPassword !== inputConfirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setPasswordMatchError(false);

    createUser({
      variables: {
        username: inputUsername,
        password: inputPassword,
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="registration-page">
      <h1>Register:</h1>
      {error ? <p style={{ color: "red" }}>Try something different!</p> : null}
      {data && !loginError ? (
        <p style={{ color: "green" }}>User Created! Logging In...</p>
      ) : null}
      {loginError ? <p style={{ color: "red" }}>Unable to login...</p> : null}
      {passwordMatchError ? (
        <p style={{ color: "red" }}>Confirmation password doesn't match...</p>
      ) : null}
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
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Password: </label>
          <input
            className={
              inputConfirmPassword !== inputPassword ? "red-input" : ""
            }
            disabled={data ? true : false}
            type="password"
            value={inputConfirmPassword}
            onChange={(e) => setInputConfirmPassword(e.target.value)}
          ></input>
        </div>

        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
