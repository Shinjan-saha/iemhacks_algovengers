import "./App.css";
import LoginForm, { category } from "./login";
import SignupForm from "./signup";
import Home from "./pages/Home";
import About from "./pages/About";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import { Routes, Route } from "react-router-dom";
// import NoteContext from './context/NoteContext';
import NoteState from "./context/NoteState";
import { useContext } from "react";
// import NoteState from './context/NoteState';
import NewComplaint from "./StudentDashboard/components/NewComplaint";
import Navbar from "./StudentDashboard/components/Navbar";
const App = () => {
  function loggedIn(category) {
    if (category === "") {
      return false;
    }
    return true;
  }
  function teacher(category) {
    if (category === "Teachers") {
      return true;
    }
    return false;
  }

  return (
    <NoteState>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={LoginForm} />
        <Route exact path="/signup" Component={SignupForm} />
        <Route exact path="/about" Component={About} />
        <Route
          exact
          path="/TeacherDashboard/TeacherDashboard"
          Component={TeacherDashboard}
        />
        <Route
          exact
          path="/StudentDashboard/StudentDashboard"
          Component={StudentDashboard}
        />
        <Route exact path="/blah" Component={NewComplaint} />
        <Route path="/bla" Component={Navbar} />
      </Routes>
    </NoteState>
    // <NoteState>
    //   <StudentDashboard/>
    // </NoteState>
  );
};

export default App;
