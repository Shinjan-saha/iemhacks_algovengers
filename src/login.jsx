import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { getUserdata, logIn } from "./firebase";
import NoteContext from "./context/NoteContext";
const LoginForm = () => {
  const navigate = useNavigate();
  // Storing the data of the user which has logged in
  const a = useContext(NoteContext);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    let uid = "";
    try {
      const user = await logIn(email, password);
      console.log("Registered");

      uid = user["uid"];
    } catch (error) {
      console.log("Error not a reg user");
    }
    let userinfo = await getUserdata(uid);

    await a.updateUser(userinfo[0], userinfo[1], userinfo[2], userinfo[3]);

    let category = userinfo[0];
    if (category === "Teachers") {
      navigate("/TeacherDashboard/TeacherDashboard");
    } else if (category === "Students") {
      navigate("/StudentDashboard/StudentDashboard");
    }
  };

  return (
    <div className="loggin-container">
      <div className="box-login">
        <div className="form">
          <h2>LoginForm</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="inputBox-login">
              <input type="text" name="email" required="required" />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBox-login">
              <input type="password" name="password" required="required" />
              <span>Password</span>
              <i></i>
            </div>
            <input type="submit" value="Login" />

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
