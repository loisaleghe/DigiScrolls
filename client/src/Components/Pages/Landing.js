import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const showHideAuth = (loginVisible) => {
    if (loginVisible) {
      setShowLogin(true);
      setShowRegister(false);
    } else {
      setShowLogin(false);
      setShowRegister(true);
    }
  };

  return (
    <div className="row">
      <div className="col col-sm-4 offset-sm-4 landing-container">
        {showLogin && <Login setVisible={showHideAuth} />}
        {showRegister && <Register setVisible={showHideAuth} />}
      </div>
    </div>
  );
}
