// import React from "react";

// import mainlogo from "../assets/img/mainlogo.avif";
// import profile from "../assets/img/profile.png";
// import AdminGallery from "./AdminGallery";
// import StaffSubject from "./StaffSubject";
// import StaffClasswork from "./StaffClasswork";
// import StaffNotice from "./StaffNotice";
// import StaffMessage from "./StaffMessage";
// import StaffManual from "./StaffManual";
// import StaffTest from "./StaffTest";

// const StaffDashboard = () => {
//   return (
//     <div className="admindashboard">

//       <header>

//         <div className="mainlogo-cont">
//         <img src={mainlogo} alt="mainlogo" className="mainlogo" />

//         <h1>(Teacher name)</h1>
// </div>
//         <div className="common-cont">
//           <span className="admin-block">
//             <img src={profile} alt="" />
//             <h2>Staff</h2>
//           </span>

//           <button className="logout-btn">LOGOUT</button>
//         </div>
//       </header>

//       <nav className="admin-nav">
//         <li>Subjects</li>
//         <li>Classwork</li>
//         <li>Notices</li>
//         <li>Messages</li>
//         <li>Manuals/Books</li>
//         <li>Tests</li>
//       </nav>

//       <div className="page-container">
//       {/* <StaffSubject></StaffSubject> */}

//       {/* <StaffClasswork></StaffClasswork> */}

//       {/* <StaffNotice></StaffNotice> */}

//       {/* <StaffMessage></StaffMessage> */}

//       {/* <StaffManual></StaffManual> */}

//       <StaffTest></StaffTest>
//       </div>

//     </div>
//   );
// };

// export default StaffDashboard;



// import React, { useState } from "react";

// import mainlogo from "../assets/img/mainlogo.avif";
// import profile from "../assets/img/profile.png";

// import StaffSubject from "./StaffSubject";
// import StaffClasswork from "./StaffClasswork";
// import StaffNotice from "./StaffNotice";
// import StaffMessage from "./StaffMessage";
// import StaffManual from "./StaffManual";
// import StaffTest from "./StaffTest";

// const StaffDashboard = () => {

//   // 👉 active tab state
//   const [activeTab, setActiveTab] = useState("Subjects");

//   // 👉 function to render component
//   const renderComponent = () => {
//     switch (activeTab) {
//       case "Subjects":
//         return <StaffSubject />;
//       case "Classwork":
//         return <StaffClasswork />;
//       case "Notices":
//         return <StaffNotice />;
//       case "Messages":
//         return <StaffMessage />;
//       case "Manuals":
//         return <StaffManual />;
//       case "Tests":
//         return <StaffTest />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="admindashboard">

//       <header>
//         <div className="mainlogo-cont">
//           <img src={mainlogo} alt="mainlogo" className="mainlogo" />
//           <h1>(Teacher name)</h1>
//         </div>

//         <div className="common-cont">
//           <span className="admin-block">
//             <img src={profile} alt="" />
//             <h2>Staff</h2>
//           </span>

//           <button className="logout-btn">LOGOUT</button>
//         </div>
//       </header>

//       {/* ================= NAVBAR ================= */}
//       <nav className="admin-nav">
//         <li
//           className={activeTab === "Subjects" ? "nav-active" : ""}
//           onClick={() => setActiveTab("Subjects")}
//         >
//           Subjects
//         </li>

//         <li
//           className={activeTab === "Classwork" ? "nav-active" : ""}
//           onClick={() => setActiveTab("Classwork")}
//         >
//           Classwork
//         </li>

//         <li
//           className={activeTab === "Notices" ? "nav-active" : ""}
//           onClick={() => setActiveTab("Notices")}
//         >
//           Notices
//         </li>

//         <li
//           className={activeTab === "Messages" ? "nav-active" : ""}
//           onClick={() => setActiveTab("Messages")}
//         >
//           Messages
//         </li>

//         <li
//           className={activeTab === "Manuals" ? "nav-active" : ""}
//           onClick={() => setActiveTab("Manuals")}
//         >
//           Manuals/Books
//         </li>

//         <li
//           className={activeTab === "Tests" ? "nav-active" : ""}
//           onClick={() => setActiveTab("Tests")}
//         >
//           Tests
//         </li>
//       </nav>

//       {/* ================= PAGE CONTENT ================= */}
//       <div className="page-container">
//         {renderComponent()}
//       </div>

//     </div>
//   );
// };

// export default StaffDashboard;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import mainlogo from "../assets/img/mainlogo.avif";
import profile from "../assets/img/profile.png";

import StaffSubject from "./StaffSubject";
import StaffClasswork from "./StaffClasswork";
import StaffNotice from "./StaffNotice";
import StaffMessage from "./StaffMessage";
import StaffManual from "./StaffManual";
import StaffTest from "./StaffTest";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("Subjects");
  const [teacherName, setTeacherName] = useState("");

  const navigate = useNavigate();

  // ✅ check login + get name
  useEffect(() => {
    const staff = localStorage.getItem("staff");

    if (!staff) {
      navigate("/stafflogin");
      return;
    }

    const data = JSON.parse(staff);
    setTeacherName(data.name);
  }, []);

  const logout = () => {
    localStorage.removeItem("staff");
    navigate("/stafflogin");
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "Subjects":
        return <StaffSubject />;
      case "Classwork":
        return <StaffClasswork />;
      case "Notices":
        return <StaffNotice />;
      case "Messages":
        return <StaffMessage />;
      case "Manuals":
        return <StaffManual />;
      case "Tests":
        return <StaffTest />;
      default:
        return null;
    }
  };

  return (
    <div className="admindashboard">
      <header>
        <div className="mainlogo-cont">
          <img src={mainlogo} alt="mainlogo" className="mainlogo" />
          <h1>{teacherName}</h1>
        </div>

        <div className="common-cont">
          <span className="admin-block">
            <img src={profile} alt="" />
            <h2>Staff</h2>
          </span>

          <button className="logout-btn" onClick={logout}>
            LOGOUT
          </button>
        </div>
      </header>

      <nav className="admin-nav">
        <li
          className={activeTab === "Subjects" ? "nav-active" : ""}
          onClick={() => setActiveTab("Subjects")}
        >
          Subjects
        </li>

        <li
          className={activeTab === "Classwork" ? "nav-active" : ""}
          onClick={() => setActiveTab("Classwork")}
        >
          Classwork
        </li>

        <li
          className={activeTab === "Notices" ? "nav-active" : ""}
          onClick={() => setActiveTab("Notices")}
        >
          Notices
        </li>

        <li
          className={activeTab === "Messages" ? "nav-active" : ""}
          onClick={() => setActiveTab("Messages")}
        >
          Messages
        </li>

        <li
          className={activeTab === "Manuals" ? "nav-active" : ""}
          onClick={() => setActiveTab("Manuals")}
        >
          Manuals/Books
        </li>

        <li
          className={activeTab === "Tests" ? "nav-active" : ""}
          onClick={() => setActiveTab("Tests")}
        >
          Tests
        </li>
      </nav>

      <div className="page-container">{renderComponent()}</div>
    </div>
  );
};

export default StaffDashboard;
