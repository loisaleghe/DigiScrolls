import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateModal from "./CreateModal";
import { setCurrentUser } from "../actions/auth";
export default function Footer() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const {
    user: { username },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setCurrentUser());
  }, []);
  return (
    <>
      <div
        className="row p-0 m-0"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <div className="col py-3">
          <img
            src="logo192.png"
            className="border border-dark rounded-circle"
            alt="Profile"
            height="50px"
            width="50px"
          />

          <span className="p-2">{username}</span>
          <button
            type="button"
            className="btn btn-outline-dark  float-right"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              textAlign: "center",
            }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            <i
              className="fa fa-paper-plane fa-lg text-dark"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
      <CreateModal show={showModal} toggle={toggleModal} />
    </>
  );
}
