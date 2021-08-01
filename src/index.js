import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from,
  HttpLink,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  console.log("auth link called!");
  console.log(operation);

  operation.setContext(({ headers }) => ({
    headers: {
      authorization: token ? `JWT ${token}` : "",
      ...headers,
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
  credentials: "include",
});

const additiveLink = from([authLink, httpLink]);

const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
