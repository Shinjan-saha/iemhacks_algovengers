import "../styles/PreviewComplaint.css";
import Button from './Button'
import React from "react";
import { resolveStudent,resolveteacher } from "../../firebase";
export default function PreviewComplaint({ complaint }) {
   const handleResolveClick = async(e) => {
    e.preventDefault();
    // You can add your resolve logic here
    console.log("Complaint resolved!");
    console.log(complaint);
    let path = `College/${complaint.CollegeName}/Students/${complaint.CollegeId}/Complains/${complaint.id}`;
    await resolveStudent(path)
    await resolveteacher(complaint.CollegeName,complaint.CollegeId,complaint.id);
  };
  console.log(complaint);
  if(complaint === undefined){
    return(
      <div className="Nocomplains">There is nothing to show here</div>
    )
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
            <span> View Attached File</span>
            {complaint.mediaSrc && (
              <img src={complaint.mediaSrc} alt="See Uploaded content" />
            )}
          </div>
        </div>

        
          <Button  onClick={handleResolveClick}>
            Resolve
          </Button>
        
      </form>
    </div>
  );
}
