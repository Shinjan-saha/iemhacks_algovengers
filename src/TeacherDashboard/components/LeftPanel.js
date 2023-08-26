import Button from "./Button";

import "../styles/LeftPanel.css";

export default function LeftPanel({
  complaints,
  children,
  onCurComplaint,
  isMenuOpen,
  onIsMenuOpen,
}) {
  function handleItemClick(elm) {
    onCurComplaint(elm);
    onIsMenuOpen(false);
  }

  return (
    <div className={`leftpanel ${isMenuOpen ? "view" : ""}`}>
      {complaints.length === 0 ? (
        <div className="no_complaint">
          There is no previous complaint to preview!
        </div>
      ) : (
        complaints.map((complaint) => (
          <div
            className="complaint"
            key={complaint.id}
            onClick={() => handleItemClick(complaint.id)}
          >
            {complaint.title.substring(0, 50)}
            <div
              className={`status_indicator ${
                complaint.status ? complaint.status : ""
              }`}
            ></div>
          </div>
        ))
      )}

      <div className="pad_div"></div>
      <div className="new_complaint_div">
        {/* <Button
          className="create_new_complaint"
          onClick={() => handleItemClick("NewComplaint")}
        >
          New Complaint
        </Button> */}
      </div>
    </div>
  );
}
