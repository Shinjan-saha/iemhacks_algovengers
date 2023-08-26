import React, { useState, useContext, useEffect } from "react";

import Button from "../components/Button";

import "../styles/NewComplaint.css";
import { userInfo } from "../StudentDashboard";

export default function NewComplaint({ onfetchdata }) {
  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState();
  const a = useContext(NoteContext);
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  let dataComplain = {
    id: 1,
    title: "He slapped me",
    message: "I am crying",
    mediaSrc: "",
    status: "active",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // --
  }

  return (
    <div className="new_complaint">
      <form onSubmit={handleSubmit}>
        <h1>Raise New Complaint</h1>
        <div className="inputBox">
          <span>Title</span>
          <input
            type="text"
            name="title"
            required="required"
            placeholder="Title for the complaint"
          />
        </div>

        <div className="inputBox">
          <span>Date and Time of the Incident</span>
          <input type="datetime-local" name="datetime" />
        </div>

        <div className="inputBox">
          <span>Message</span>
          <textarea
            name="message"
            required="required"
            placeholder="Explain your complaint here ..."
            rows="6"
          />
        </div>

        <div className="inputBox">
          <span>Add attachment</span>
          <label className="file">
            <input type="file" name="attachment" onChange={handleChange} />
            <div>{file ? file.name : "Click here to choose file"}</div>
          </label>

          {uploadedFile && <img src={uploadedFile} alt="Uploaded content" />}
          {error && <p>Error uploading file</p>}
        </div>
        <Button className="submit">Submit</Button>
      </form>
    </div>
  );
}
