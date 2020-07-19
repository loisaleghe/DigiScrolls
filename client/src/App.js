import React, { useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Nav from "./Components/Nav";
import Landing from "./Components/Pages/Landing";
import Home from "./Components/Pages/Home";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import { setCurrentUser } from "./actions/auth";
import PrivateRoute from "./Components/PrivateRoute";
import "./App.css";

function App() {
  const authenticateUser = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API;
    const token = localStorage.getItem("x-auth");
    if (token) {
      axios.defaults.headers.common["x-auth"] = token;
      await store.dispatch(setCurrentUser());
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <StoreProvider store={store}>
      <Router>
        <Nav />
        <div className="container-fluid p-0 m-0">
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
