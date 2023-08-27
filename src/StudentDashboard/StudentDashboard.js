import { useState, useEffect, useContext } from "react";

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import NewComplaint from "./components/NewComplaint";
import PreviewComplaint from "./components/PreviewComplaint";
import { findExistingcomplains } from "../firebase";

import "./styles/StudentDashboard.css";
import NoteContext from "../context/NoteContext";
import NoteState from "../context/NoteState";
import { useNavigate } from "react-router-dom";
export let userInfo = {
  CollegeId: "",
  email: "",
  CollegeName: "",
};

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState(null);
  const [curComplaint, setcurComplaint] = useState("NewComplaint");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Fetching the data of the student
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
  const navigate = useNavigate();
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
  let path = `College/${a.user.CollegeName}/Students/${a.user.CollegeId}/Complains`;
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
    </NoteState>
  );
}