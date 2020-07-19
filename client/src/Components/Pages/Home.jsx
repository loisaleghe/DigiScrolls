import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Footer from "../Footer";
export default function Home() {
  const fetchUserNotes = () => {
    axios.get("/notes/current/author").then((result) => {
      setNotes(result.data);
    });
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchUserNotes();
  }, []);
  return (
    <>
      <div className="home-page">
        <VerticalTimeline layout="1-column">
          {notes.map((note) => (
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
                    type="button"
                    className="btn btn-outline-primary btn-sm m-2"
                  >
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm m-2"
                  >
                    <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </VerticalTimelineElement>
              <p className="text-right pr-2 text-muted small pt-2">
                {moment(new Date()).toString()}
              </p>
            </div>
          ))}
        </VerticalTimeline>
      </div>

      <Footer />
    </>
  );
}
