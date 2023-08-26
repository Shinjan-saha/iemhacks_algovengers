import { useState, useEffect, useContext } from "react";

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import NewComplaint from "./components/NewComplaint";
import PreviewComplaint from "./components/PreviewComplaint";

import "./styles/StudentDashboard.css";

let complaints = {};

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState(null);
  const [curComplaint, setcurComplaint] = useState("NewComplaint");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Fetching the data of the student

  return (
    <div className="student-container">
      <Navbar onIsMenuOpen={setIsMenuOpen} />
      <div className="student-main">
        <LeftPanel
          complaints={complaints}
          onCurComplaint={setcurComplaint}
          isMenuOpen={isMenuOpen}
          onIsMenuOpen={setIsMenuOpen}
        />
        <RightPanel>
          {curComplaint === "NewComplaint" ? (
            <NewComplaint onfetchdata={fetchData} />
          ) : (
            <PreviewComplaint
              complaint={
                complaints.filter(
                  (complaint) => complaint.id === curComplaint
                )[0]
              }
            />
          )}
        </RightPanel>
      </div>
    </div>
  );
}
