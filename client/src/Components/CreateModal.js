import React, { useRef } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

export default function CreateModal({ show, toggle }) {
  const titleInput = useRef();
  const contentInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    const title = titleInput.current.value;
    const content = contentInput.current.value;
    const userParams = { title, content };
    axios
      .post(`/notes`, userParams)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
