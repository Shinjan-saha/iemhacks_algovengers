import "../styles/PreviewComplaint.css";
import Button from "./Button";
import React, { useState } from "react";
import { resolveStudent, resolveteacher, getMedia } from "../../firebase";
import Loader from "./Loader";


export default function PreviewComplaint({ complaint, onfetchdata }) {
  const [mediaUrl, setMediaUrl] = useState("");

  function get_url_extension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  function get_media_type(ext) {
    switch (ext.trim().toLowerCase()) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "image";
        break;
      case "mp4":
        return "video";
        break;
      case "mp3":
      case "wav":
        return "audio";
        break;
      default:
        return null;
    }
  }

  let mediaExt = get_url_extension(mediaUrl);
  let mediaType = get_media_type(mediaExt);

  const handleResolveClick = async (e) => {
    e.preventDefault();
    // You can add your resolve logic here
    console.log("Complaint resolved!");
    console.log(complaint);
    let path = `College/${complaint.CollegeName}/Students/${complaint.CollegeId}/Complains/${complaint.id}`;
    await resolveStudent(path);
    await resolveteacher(
      complaint.CollegeName,
      complaint.CollegeId,
      complaint.id
    );
   path = `College/${complaint.CollegeName}/Teachers/${complaint.CollegeId}/Complains`;
  };
  console.log(complaint);
  if (complaint === undefined) {
    return <div className="Nocomplains">There is nothing to show here</div>;
  }

  async function getMediaUrl() {
    console.log(complaint.mediaSrc);
   let mm =  await getMedia(complaint.mediaSrc);


  
    setMediaUrl(mm);

  }
  getMediaUrl();

  if(mediaUrl.trim()=== ''){
    return <Loader />
  }

  return (
    <div className="preview_complaint">
      <form className="complaint-form">
        <h1>View Raised Complaint</h1>

        <div className="inputBox status">
          <span>Status</span>
          <div className="status_text">
            <span
              className={`status_indicator ${
                complaint.status ? complaint.status : ""
              }`}
            ></span>
            {complaint.status.charAt(0).toUpperCase() +
              complaint.status.slice(1).toLowerCase()}
          </div>
        </div>

        <div className="inputBox">
          <span>Title</span>
          <input type="text" name="title" value={complaint.title} />
        </div>

        {complaint.datetime && (
          <div className="inputBox">
            <span>Date and Time of the Incident</span>
            <input
              type="datetime-local"
              value={complaint.datetime}
              name="datetime"
              disabled="disabled"
            />
          </div>
        )}

        <div className="inputBox">
          <span>Message</span>
          <textarea
            name="message"
            rows="6"
            value={complaint.message}
            disabled="disabled"
          />
        </div>

        <div className="button-container clearfix">
          <div className="inputBox">
            <span>Attached File</span>
            {mediaUrl.trim() !== "" &&
              (mediaType === "image" ? (
                <img src={mediaUrl} alt="See Uploaded content" />
              ) : mediaType === "video" ? (
                <video controls="controls">
                  <source src={mediaUrl} type={`audio/${mediaExt}`} />
                </video>
              ) : mediaType === "audio" ? (
                <audio controls="controls">
                  <source src={mediaUrl} type={`audio/${mediaExt}`} />
                </audio>
              ) : null)}
          </div>
        </div>

        <Button onClick={handleResolveClick}>Resolve</Button>
      </form>
    </div>
  );
}