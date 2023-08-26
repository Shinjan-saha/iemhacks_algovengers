import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import logo from "./images/logo.png";
import { useFetcher, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { getUserdata, logIn } from "./firebase";
import NoteContext from "./context/NoteContext";
const LoginForm = () => {
  useEffect(() => {
    console.log("hello");
    console.log(a.user);
    if (a.user) {
      if (a.user.Category === "Teachers") {
        navigate("/TeacherDashboard/TeacherDashboard");
      } else if (a.user.Category === "Students") {
        navigate("/StudentDashboard/StudentDashboard");
      }
    }
  });
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
    getUserdata(uid).then((userinfo) => {
      console.log(userinfo);
      console.log("before set user");
      //  a.updateUser(userinfo[0], userinfo[1], userinfo[2], userinfo[3])
      a.setUser({
        Category: userinfo[0],
        CollegeName: userinfo[2],
        CollegeId: userinfo[1],
        email: userinfo[3],
      });
      sessionStorage.setItem("Category", userinfo[0]);
      sessionStorage.setItem("CollegeName", userinfo[2]);
      sessionStorage.setItem("CollegeId", userinfo[1]);
      sessionStorage.setItem("email", userinfo[3]);

      console.log("after setuser");
      console.log(a.user);
    });
  };

  return (
    <div className="loggin-container">
      <div className="box-login">
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <h2 className="login-form-heading">LoginForm</h2>
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
