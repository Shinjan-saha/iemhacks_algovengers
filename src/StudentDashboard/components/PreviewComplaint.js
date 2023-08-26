import "../styles/PreviewComplaint.css";

export default function PreviewComplaint({ complaint }) {
  return (
    <div className="preview_complaint">
      <form>
        <h1>Preview Raised Complaint</h1>

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

        <div className="inputBox">
          <span>Attached File</span>
          {complaint.mediaSrc && (
            <img src={complaint.mediaSrc} alt="Uploaded content" />
          )}
        </div>
      </form>
    </div>
  );
}
