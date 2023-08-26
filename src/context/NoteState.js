import React, { useState } from "react";
import NoteContext from "./NoteContext";

function getSessionData() {
  let data2send = {
    Category: "",
    CollegeName: "",
    CollegeId: "",
    email: "",
  };
  data2send.Category = sessionStorage.getItem("Category") || "";
  data2send.CollegeName = sessionStorage.getItem("CollegeName") || "";
  data2send.CollegeId = sessionStorage.getItem("CollegeId") || "";
  data2send.email = sessionStorage.getItem("email") || "";

  return data2send;
}

const NoteState = (props) => {
  // let userId = {
  //     "Category" : "",
  //     "CollegeName" : "",
  //     "CollegeId" : "",
  //     "email" : ""
  // }

 const [user, setUser] = useState(getSessionData());

  console.log(user);
  return (
    <NoteContext.Provider value={{ user, setUser }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;