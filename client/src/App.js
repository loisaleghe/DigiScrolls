import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Landing from "./Components/Pages/Landing";
import "./App.css";

function App() {
  useEffect(() => {
    // Set axios base url
    axios.defaults.baseURL = process.env.REACT_APP_API;
  }, []);

  return (
    <Router>
      <Nav />
      <div className="container-fluid p-0 m-0">
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;
