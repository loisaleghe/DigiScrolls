import React, { useRef } from "react";
import axios from "axios";

export default function Register(props) {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordEmail = useRef();
  const emailInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const email = emailInput.current.value;
    const userParams = { username, password, email };
    axios
      .post(`/register`, userParams)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="card bg-light mb-3 justify-content-end">
      <div className="card-header">REGISTER</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputName">Username</label>
            <input ref={usernameInput} type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              ref={emailInput}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              ref={passwordInput}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              ref={confirmPasswordEmail}
              type="password"
              className="form-control"
              id="exampleInputPassword2"
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
            onClick={() => {
              props.setVisible(true);
            }}
          >
            Sign in
            <small id="emailHelp" className="form-text text-muted">
              Already have an account? Log in
            </small>
          </button>
        </form>
      </div>
    </div>
  );
}
