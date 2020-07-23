import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";

export default function Login(props) {
  const usernameInput = useRef();
  const passwordInput = useRef();

  const dispatch = useDispatch(); //to dispatch our actions to users

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const userParams = { username, password };
    await dispatch(login(userParams));
  };

  return (
    <div className="loginPage">
      <div className="row  justify-content-center loginRow">
        <div className="card bg-light mb-3 justify-content-end">
          <div className="card-header">LOGIN</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group name">
                <label htmlFor="inputName">Username</label>
                <input
                  ref={usernameInput}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group passwrd">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  ref={passwordInput}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Submit
              </button>
              <br />

              <button
                className="btn btn-outline-dark btn-block"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  props.setVisible(false);
                }}
              >
                Sign Up
                <small id="emailHelp" className="form-text text-muted">
                  You don't have an account? Sign up!{" "}
                </small>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
