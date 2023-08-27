import React, { useState, useContext, useEffect } from "react";

import Navbar from "./components/Navbar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import PreviewComplaint from "./components/PreviewComplaint";
import { findExistingcomplains, getMedia } from "../firebase";
import "./styles/TeacherDashboard.css";
import NoteContext from "../context/NoteContext";
import NoteState from "../context/NoteState";
import { useNavigate } from "react-router-dom";

export let userInfo = {
  CollegeId: "",
  email: "",
  CollegeName: "",
};

export default function TeacherDashboard() {
  const [complaints, setComplaints] = useState(null);
  const [curComplaint, setCurComplaint] = useState(
    complaints === null ? null : complaints[0]?.id
  ); // Set the first complaint as the default
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function fetchData(path) {
    try {
      const res = await findExistingcomplains(path);
      setComplaints(res); // Set the complaints state with resolved data
      console.log("FOund complains");
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  let navigate = useNavigate();
  let a = useContext(NoteContext);
  if (a.user.Category === "") {
    navigate("/login");
  }
  console.log("this my a after entering");
  console.log(a);
  let val = a.user.CollegeId;
  userInfo.CollegeId = val;
  userInfo.CollegeName = a.user.CollegeName;
  userInfo.email = a.user.email;
  console.log("Yes");
  let path = `College/${a.user.CollegeName}/Teachers/${a.user.CollegeId}/Complains`;
  console.log("This is user college name in  student dashboard");
  console.log(a.user.CollegeName);
  useEffect(() => {
    fetchData(path);
  }, []);
  console.log("this is user info");
  console.log(userInfo);

  if (complaints === null) {
    return (
      <div className="student-loading">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <NoteState>
    <div className="student-container">
      <Navbar onIsMenuOpen={setIsMenuOpen} />
      <div className="student-main">
        <LeftPanel
          complaints={complaints}
          onCurComplaint={setCurComplaint}
          isMenuOpen={isMenuOpen}
          onIsMenuOpen={setIsMenuOpen}
        />
        <RightPanel>
          <PreviewComplaint
            complaint={complaints.find(
              (complaint) => complaint.id === curComplaint
            )}
          />
        </RightPanel>
      </div>
    </div>
    </NoteState>
  );
}