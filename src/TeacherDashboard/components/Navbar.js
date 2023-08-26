import { useState,useContext } from "react";
import Button from "./Button";

import "../styles/Navbar.css";
import NoteContext from "../../context/NoteContext";
import logo from "../../images/logo.png";

export default function Navbar({ onIsMenuOpen }) {
  const ab = useContext(NoteContext);
  function handleSignout(){
    
    sessionStorage.setItem("Category", "");
    sessionStorage.setItem("CollegeName", "");
    sessionStorage.setItem("CollegeId", "");
    sessionStorage.setItem("email", "");
    console.log(sessionStorage);
    ab.setUser({ Category: "",
    CollegeName: "",
    CollegeId: "",
    email: "",})
    window.location.reload()
  }
  
function Logo() {
  return <img className="logo" src={logo} alt="logo" />;
}

function Profile() {
  const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);

  return (
    <>
      <div
        className="profile_logo"
        onClick={() => setIsProfileBoxOpen((is) => !is)}
      ></div>
      <div className={`profile_box ${isProfileBoxOpen ? "view" : ""}`}>
        <span>Not You?</span>
        <Button className="signout" onClick={handleSignout}>Sign Out</Button>
      </div>
    </>
  );
}

function Menu({ onIsMenuOpen }) {
  return (
    <div className="menu_logo" onClick={() => onIsMenuOpen((is) => !is)}></div>
  );
}

  return (
    <div className="navbar">
      <Logo />
      <span className="navbar_text">Teacher Dashboard</span>
      <div className="right_logos">
        <Profile />
        <Menu onIsMenuOpen={onIsMenuOpen} />
      </div>
    </div>
  );
}

