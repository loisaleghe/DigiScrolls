import React, { useRef, useEffect } from "react";
import { register, resetAuthState } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function Register(props) {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordEmail = useRef();
  const emailInput = useRef();
  const dispatch = useDispatch(); //to dispatch our actions to users

  const { success, message } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const email = emailInput.current.value;
    const userParams = { username, password, email };
    await dispatch(register(userParams));
  };

  useEffect(() => {
    if (!success && message.length > 0) {
      swal({
        title: "Oops!",
        text: message,
        icon: "error",
      }).then(() => dispatch(resetAuthState()));
    }
  }, [success, message]);

  return (
    <div className="">
      <div className="card bg-light mb-3 justify-content-center loginRow">
        <div className="card-header">REGISTER</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputName">Username</label>
              <input
                ref={usernameInput}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                ref={emailInput}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
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
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword2">Confirm Password</label>
              <input
                ref={confirmPasswordEmail}
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                required
              />
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
    </div>
  );
}
