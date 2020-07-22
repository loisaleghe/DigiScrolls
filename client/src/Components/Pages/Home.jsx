import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Footer from "../Footer";
import { getCurrentUserNote, getNote } from "../../actions/notes";
import EditModal from "../EditModal";
import { GET_NOTE } from "../../actions";
import { deleteNote } from "../../actions/notes";

export default function Home() {
  const [showEditModal, setShowEditModal] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const closeEditModal = () => setShowEditModal(false);
  const dispatch = useDispatch(); //to dispatch our actions to users
  const { currentUserNotes } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getCurrentUserNote());
  }, []);

  const onEditNote = async (noteId) => {
    await dispatch(getNote(noteId));
    setShowEditModal(true);
  };

  const onDeleteNote = async (noteId) => {
    const response = await swal({
      title: "Are you sure?",
      text: "You won't be able to recover this note once deleted!",
      icon: "warning",
      buttons: { cancel: "Cancel", confirm: "Yes" },
    });

    if (response) {
      await dispatch(deleteNote(noteId));
    }
  };
  return (
    <>
      <div className="home-page">
        <VerticalTimeline layout="1-column">
          {currentUserNotes.map((note) => (
            <div key={note._id}>
              <VerticalTimelineElement
                className="vertical-timeline-element--work  mb-0"
                position="right"
                textClassName="pb-0"
                iconClassName="d-flex flex-column justify-content-center align-items-center"
                iconStyle={{ backgroundColor: "lavenderblush" }}
                contentStyle={{
                  borderRadius: "12.5px",
                  boxShadow: "2px 3px 5px 1px rgba(0,0,0,0.125)",
                }}
                icon={
                  <i
                    className="fa fa-user-o fa-lg text-black"
                    aria-hidden="true"
                  ></i>
                }
                dateClassName="p-0 m-0"
              >
                <h4 className="vertical-timeline-element-title">
                  {note.title}
                </h4>
                <hr />
                <p>{note.content}</p>
                <div className="text-right pb-2">
                  <button
                    onClick={() => onEditNote(note._id)}
                    type="button"
                    className="btn btn-outline-primary btn-sm m-2"
                  >
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => onDeleteNote(note._id)}
                    type="button"
                    className="btn btn-outline-danger btn-sm m-2"
                  >
                    <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </VerticalTimelineElement>
              <p className="text-right pr-2 text-muted small pt-2">
                {moment(note.createdAt).toString()}
              </p>
            </div>
          ))}
        </VerticalTimeline>
      </div>
      <EditModal show={showEditModal} toggle={toggleEditModal} />

      <Footer />
    </>
  );
}
