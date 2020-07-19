import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, ...props }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
}
