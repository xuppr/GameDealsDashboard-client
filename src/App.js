import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { WHOAMI_QUERY } from "./queries/queries";

import DashboardPage from "./components/dashboard-page/DashboardPage";
import AnonymousDashboard from "./components/anonymous-dashboard/AnonymousDashboard";
import LoginPage from "./components/login-page/LoginPage";
import RegistrationPage from "./components/registration-page/RegistrationPage";
import Navbar from "./components/navbar/Navbar";
import UserInfo from "./components/user-info/UserInfo";

import "./App.css";
import DetailPage from "./components/detail-page/DetailPage";

function App() {
  const [username, setUsername] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    if (username === null) {
      client
        .query({
          query: WHOAMI_QUERY,
        })
        .then((res) => {
          setUsername(res.data.whoami);
        })
        .catch((err) => {
          console.log(err);
          setUsername("");
        });
    }
  }, []);

  if (username === null) {
    return <h1></h1>; //checking saved credentials
  }

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Navbar>
            <Link to="/">
              <h1>Game Deals</h1>
            </Link>
            <UserInfo username={username} setUsername={setUsername} />
          </Navbar>
        </nav>

        <Switch>
          <Route exact path="/">
            {username ? <DashboardPage /> : <AnonymousDashboard />}
          </Route>
          <Route exact path="/login">
            <LoginPage username={username} setUsername={setUsername} />
          </Route>
          <Route exact path="/register">
            <RegistrationPage username={username} setUsername={setUsername} />
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
