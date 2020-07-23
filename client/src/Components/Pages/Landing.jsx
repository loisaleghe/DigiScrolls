import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const showHideAuth = (loginVisible) => {
    if (loginVisible) {
      setShowLogin(true);
      setShowRegister(false);
    } else {
      setShowLogin(false);
      setShowRegister(true);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (isAuthenticated) {
    return <Redirect to="/home"></Redirect>;
  }

  return (
    <div className="loginPage">
      <div className="row">
        <div className="col col-sm-4 offset-sm-4 landing-container">
          {showLogin && <Login setVisible={showHideAuth} />}
          {showRegister && <Register setVisible={showHideAuth} />}
        </div>
      </div>
    </div>
  );
}
