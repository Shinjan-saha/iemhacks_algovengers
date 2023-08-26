import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import "../styles/Navbar.css";
import logo from "../../images/logo.png";

export default function Navbar({ onIsMenuOpen }) {
  // --

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
          <span>CollegeId:{info.CollegeId}</span>
          <span>Email:{info.email}</span>
          <Button className="signout" onClick={handleSignout}>
            Sign Out
          </Button>
        </div>
      </>
    );
  }

  function Menu({ onIsMenuOpen }) {
    return (
      <div
        className="menu_logo"
        onClick={() => onIsMenuOpen((is) => !is)}
      ></div>
    );
  }

  return (
    <div className="navbar">
      <Logo />
      <span className="navbar_text">Student Dashboard</span>
      <div className="right_logos">
        <Profile />
        <Menu onIsMenuOpen={onIsMenuOpen} />
      </div>
    </div>
  );
}
