import React, { useState } from "react";
import "./signup.css";
// import googleLogo from '../src/images/';
import { signUp, storeUserdata, createUser } from "./firebase";
import Select from "react-select";

const SignupForm = ({ onSignup }) => {
  // This algo can break in one more way we will discuss it

  const handleFormSubmit = async (e) => {
    const emailaddress = async (email) => {
      for (let i = 0; i < email.length; i++) {
        if (email.charAt(i) === "@") {
          console.log("found @");
          return true;
        }
      }
      alert("Enter a Valid email");
      return false;
    };
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const CollegeName = e.target.elements.CollegeName.value;
    const CollegeId = e.target.elements.CollegeId.value;
    const teacherStatus = e.target.elements.teacherStatus.value;
    if (password.length < 6) {
      alert("Password must be of minimum 6 kjdfsha");
      return;
    }
    const emailCheck = await emailaddress(email);
    if (!emailCheck) {
      return false;
    }
    const store = await storeUserdata(
      CollegeName,
      CollegeId,
      email,
      teacherStatus
    );
    if (!store) {
      alert(
        "Your College is not registerd , First your college have to make a teacher account"
      );
      return;
    }
    let uid = "";
    try {
      const user = await signUp(email, password);
      console.log("Registered user:", user);
      uid = user["uid"];
      // Redirect or perform other actions after successful signup
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle error state
    }
    // Perform login validation
    // if (username === 'megatron' && password === '1234') {
    //   onSignup();
    // } else {
    //   alert('Invalid username or password');
    // }
    if (teacherStatus === "yes") {
      await createUser(CollegeName, "Teachers", CollegeId, email, uid);
    } else {
      await createUser(CollegeName, "Students", CollegeId, email, uid);
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: "yes", label: "yes" },
    { value: "no", label: "No" },
  ];

  return (
    <div className="signup-container">
      <div className="box">
        <div className="form">
          <h2>SignupForm</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="inputBox">
              <input type="text" name="CollegeName" required="required" />
              <span>College Name</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="text" name="CollegeId" required="required" />
              <span>College ID</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="text" name="email" required="required" />
              <span>E-mail</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="text" name="password" required="required" />
              <span>Password</span>
              <i></i>
            </div>
            <div className="inputBox">
              <label htmlFor="inputField">
                <Select
                  name="teacherStatus"
                  placeholder="Are you a teacher?"
                  options={options}
                  className="custom-select"
                />
              </label>
              {/* <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </Select> */}
            </div>
            <input type="submit" value="Sign-up" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
