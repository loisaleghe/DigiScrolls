import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../actions/notes";

export default function EditModal({ show, toggle }) {
  const [noteParams, setNoteParams] = useState({});

  const dispatch = useDispatch();

  const { note } = useSelector((state) => state.notes);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setNoteParams({
      ...noteParams,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateNote(note._id, noteParams));
    toggle();
    swal({
      title: "Success!",
      text: "Note updated successfully",
      icon: "success",
    });
  };

  useEffect(() => {
    setNoteParams({ ...noteParams, ...note });
  }, [note]);

  return (
    <>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>EDIT NOTE</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="createModalTitle">TITLE</label>
              <input
                type="text"
                name="title"
                value={noteParams.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="createModalContent"> CONTENT</label>
              <textarea
                name="content"
                value={noteParams.content}
                onChange={handleChange}
                className="form-control"
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
