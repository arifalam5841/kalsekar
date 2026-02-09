// import React from "react";

// import mainlogo from "../assets/img/mainlogo.avif";
// import profile from "../assets/img/profile.png";
// import AdminStudent from "./AdminStudent";
// import AdminTeacher from "./AdminTeacher";
// import AdminNotice from "./AdminNotice";
// import AdminEvent from "./AdminEvent";
// import AdminTimetable from "./AdminTimetable";
// import AdminGallery from "./AdminGallery";
// const Admindashboard = () => {
//   return (
//     <div className="admindashboard">
//       <header>
//         <img src={mainlogo} alt="mainlogo" className="mainlogo" />

//         <div className="common-cont">
//           <span className="admin-block">
//             <img src={profile} alt="" />
//             <h2>Admin</h2>
//           </span>

//           <button className="logout-btn">LOGOUT</button>
//         </div>
//       </header>

//       <nav className="admin-nav">
//         <li>Students</li>
//         <li>Teachers</li>
//         <li>Notice</li>
//         <li>Events / Annoucements</li>
//         <li>Time Tables</li>
//         <li>Gallery</li>
//       </nav>

//       <div className="page-container">
//         {/* <AdminStudent></AdminStudent> */}
//         {/* <AdminTeacher></AdminTeacher> */}
//         {/* <AdminNotice></AdminNotice> */}
//         {/* <AdminEvent></AdminEvent> */}
//         {/* <AdminTimetable></AdminTimetable> */}
//         <AdminGallery></AdminGallery>
//       </div>
//     </div>
//   );
// };

// export default Admindashboard;



// import React, { useState } from "react";

// import mainlogo from "../assets/img/mainlogo.avif";
// import profile from "../assets/img/profile.png";

// import AdminStudent from "./AdminStudent";
// import AdminTeacher from "./AdminTeacher";
// import AdminNotice from "./AdminNotice";
// import AdminEvent from "./AdminEvent";
// import AdminTimetable from "./AdminTimetable";
// import AdminGallery from "./AdminGallery";

// const Admindashboard = () => {

//   // ✅ active tab state
//   const [activeTab, setActiveTab] = useState("students");


//   // ✅ component switcher
//   const renderComponent = () => {
//     switch (activeTab) {
//       case "students":
//         return <AdminStudent />;

//       case "teachers":
//         return <AdminTeacher />;

//       case "notice":
//         return <AdminNotice />;

//       case "events":
//         return <AdminEvent />;

//       case "timetable":
//         return <AdminTimetable />;

//       case "gallery":
//         return <AdminGallery />;

//       default:
//         return <AdminStudent />;
//     }
//   };


//   return (
//     <div className="admindashboard">

//       {/* ================= HEADER ================= */}
//       <header>
//         <img src={mainlogo} alt="mainlogo" className="mainlogo" />

//         <div className="common-cont">
//           <span className="admin-block">
//             <img src={profile} alt="" />
//             <h2>Admin</h2>
//           </span>

//           <button className="logout-btn">LOGOUT</button>
//         </div>
//       </header>


//       {/* ================= NAVBAR ================= */}
//       <nav className="admin-nav">

//         <li
//           className={activeTab === "students" ? "active-tab" : ""}
//           onClick={() => setActiveTab("students")}
//         >
//           Students
//         </li>

//         <li
//           className={activeTab === "teachers" ? "active-tab" : ""}
//           onClick={() => setActiveTab("teachers")}
//         >
//           Teachers
//         </li>

//         <li
//           className={activeTab === "notice" ? "active-tab" : ""}
//           onClick={() => setActiveTab("notice")}
//         >
//           Notice
//         </li>

//         <li
//           className={activeTab === "events" ? "active-tab" : ""}
//           onClick={() => setActiveTab("events")}
//         >
//           Events / Announcements
//         </li>

//         <li
//           className={activeTab === "timetable" ? "active-tab" : ""}
//           onClick={() => setActiveTab("timetable")}
//         >
//           Time Tables
//         </li>

//         <li
//           className={activeTab === "gallery" ? "active-tab" : ""}
//           onClick={() => setActiveTab("gallery")}
//         >
//           Gallery
//         </li>

//       </nav>


//       {/* ================= PAGE ================= */}
//       <div className="page-container">
//         {renderComponent()}
//       </div>

//     </div>
//   );
// };

// export default Admindashboard;



import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

import mainlogo from "../assets/img/mainlogo.avif";
import profile from "../assets/img/profile.png";

import AdminStudent from "./AdminStudent";
import AdminTeacher from "./AdminTeacher";
import AdminNotice from "./AdminNotice";
import AdminEvent from "./AdminEvent";
import AdminTimetable from "./AdminTimetable";
import AdminGallery from "./AdminGallery";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();

  // ✅ protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsub();
  }, [navigate]);

  // ✅ logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "students":
        return <AdminStudent />;
      case "teachers":
        return <AdminTeacher />;
      case "notice":
        return <AdminNotice />;
      case "events":
        return <AdminEvent />;
      case "timetable":
        return <AdminTimetable />;
      case "gallery":
        return <AdminGallery />;
      default:
        return <AdminStudent />;
    }
  };

  return (
    <div className="admindashboard">

      {/* HEADER */}
      <header>
        <img src={mainlogo} alt="mainlogo" className="mainlogo" />

        <div className="common-cont">
          <span className="admin-block">
            <img src={profile} alt="" />
            <h2>Admin</h2>
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </header>

      {/* NAV */}
      <nav className="admin-nav">
        {[
          "students",
          "teachers",
          "notice",
          "events",
          "timetable",
          "gallery",
        ].map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor:
                activeTab === tab ? "#243F69" : "transparent",
              color: activeTab === tab ? "#fff" : "#000",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </nav>

      {/* PAGE */}
      <div className="page-container">{renderComponent()}</div>
    </div>
  );
};

export default Admindashboard;
