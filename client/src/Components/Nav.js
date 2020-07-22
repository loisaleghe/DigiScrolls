import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Nav() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg ">
      <Link
        to="/"
        className={
          location.pathname === "/"
            ? "navbar-brand mr-auto nav-link active"
            : "navbar-brand mr-auto nav-link"
        }
      >
        DIGI-SCROLL
      </Link>
      {isAuthenticated && (
        <Link
          className="nav-link"
          to="/"
          onClick={() => {
            dispatch(logout());
          }}
        >
          {" "}
          LOGOUT
        </Link>
      )}
    </nav>
  );
}
