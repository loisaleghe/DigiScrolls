import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { createUserNote } from "../actions/notes";
import swal from "sweetalert";

export default function CreateModal({ show, toggle }) {
  const titleInput = useRef();
  const contentInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = titleInput.current.value;
    const content = contentInput.current.value;
    const noteParams = { title, content };
    dispatch(createUserNote(noteParams));
    toggle();
    swal({
      title: "Success!",
      text: "Note added successfully",
      icon: "success",
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>NEW NOTE</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="createModalTitle">TITLE</label>
              <input
                ref={titleInput}
                className="form-control"
                id="tileModalText"
              />
            </div>
            <div className="form-group">
              <label htmlFor="createModalContent"> CONTENT</label>
              <textarea
                ref={contentInput}
                className="form-control"
                id="createModalText"
                rows="3"
                placeholder="Enter note content here"
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-primary">
              Save Note
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
