import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Admindashboard from "./components/Admindashboard";
import StaffDashboard from "./components/StaffDashboard";
import StudentDashboard from "./components/StudentDashboard";
import StudentLogin from "./components/StudentLogin";
import DegreeDiploma from "./components/StudentDegreeDiploma";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Admindashboard></Admindashboard> */}
      {/* <StaffDashboard></StaffDashboard> */}

      {/* <StudentDashboard></StudentDashboard> */}

      {/* <StudentLogin></StudentLogin> */}

      {/* <DegreeDiploma></DegreeDiploma> */}
    </>
  );
}

export default App;
