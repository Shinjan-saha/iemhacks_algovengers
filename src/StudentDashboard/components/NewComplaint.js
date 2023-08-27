import React, { useState, useContext, useEffect } from "react";

import Button from "../components/Button";

import "../styles/NewComplaint.css";
import { createComplain, uploadMedia } from "../../firebase";
import NoteContext from "../../context/NoteContext";
import { userInfo } from "../StudentDashboard";
import { v4 } from "uuid";

export default function NewComplaint({ onfetchdata }) {
  useEffect(() => {
    console.log("I am re rendering to check if user info is updated");
    console.log(userInfo);
  });
  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState();
  const a = useContext(NoteContext);

  function get_url_extension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  function handleChange(event) {
    switch (get_url_extension(event.target.files[0].name).trim()) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "mp4":
      case "mp3":
      case "wav":
        console.log("supported Media type!!");
        setFile(event.target.files[0]);
        break;
      default:
        console.log("Unsupported media type");
        setFile();
    }
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
    const address = await uploadMedia(file);
    let title = event.target.elements.title.value;
    let date = event.target.elements.datetime.value;
    let message = event.target.elements.message.value;
    dataComplain["title"] = title;
    dataComplain["message"] = message;
    dataComplain["mediaSrc"] = address;
    dataComplain["status"] = "active";
    dataComplain["datatime"] = date;
    dataComplain["id"] = v4();
    console.log(dataComplain);
    console.log("this is college Name");
    console.log(userInfo.CollegeName);
    await createComplain(
      userInfo.CollegeName,
      userInfo.CollegeId,
      dataComplain
    );
    // console.log(a.userId);
    // await createComplain(a.userId.CollegeName,a,userId.CollegeId,dataComplain)
    // refreshing exisiting complains
    let path = `College/${userInfo.CollegeName}/Students/${userInfo.CollegeId}/Complains`;
    onfetchdata(path);
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