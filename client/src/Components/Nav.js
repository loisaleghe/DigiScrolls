import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
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
    </nav>
  );
}
