


// import React from "react";

// /* Logos & Menu Icons */
// import mainlogo from "../assets/img/mainlogo.avif";
// import menuicon from "../assets/img/menuicon.png";

// /* Sidebar Icons */
// import classwork from "../assets/img/classroom.png";
// import timetable from "../assets/img/timetable.png";
// import test from "../assets/img/test.png";
// import book from "../assets/img/book.png";
// import manual from "../assets/img/manual.png";
// import gallery from "../assets/img/gallery.png";
// import about from "../assets/img/about.png";
// import contact from "../assets/img/contact.png";
// import StudentSubjectdetail from "./StudentSubjectdetail";
// import StudentSubject from "./StudentSubject";
// import StudentClasswork from "./StudentClasswork";
// import StudentEvent from "./StudentEvent";
// import StudentManual from "./StudentManual";
// import StudentTest from "./StudentTest";
// import StudentNotice from "./StudentNotice";
// import StudentTimetable from "./StudentTimetable";
// import StudentGallery from "./StudentGallery";



// const StudentDashboard = () => {
//   return (
//     <div id="main-container">

//       {/* MENU */}
//       <div id="menu-container">
//         <nav id="navbar">
//           <div className="logo-main-cont">
//             <img src={mainlogo} alt="Main Logo" />
//           </div>

//           <div id="nav-button-cont">
//             <button id="nav-menu-button">
//               <img src={menuicon} alt="Menu" />
//             </button>
//           </div>
//         </nav>

//         <div id="secondary-menu">
//           <ul>
//             <a href="/" id="h_classwork_btn">
//               <img src={classwork} alt="" /> Classwork menu
//             </a>

//             <a href="/" id="h_timetable_btn">
//               <img src={timetable} alt="" /> Timetables
//             </a>

//             <a href="/" id="h_test_btn">
//               <img src={test} alt="" /> Tests
//             </a>

          

//             <a href="/" id="h_manual_btn">
//               <img src={manual} alt="" /> Manual/ Books
//             </a>

//             <a href="/" id="h_gallery_btn">
//               <img src={gallery} alt="" /> Gallery
//             </a>

//             <a href="/" id="about-btn">
//               <img src={about} alt="" /> About
//             </a>

//             <a href="/" id="contact-btn">
//               <img src={contact} alt="" /> Contact
//             </a>
//           </ul>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <button id="change-branch">Change Branch</button>

//             <footer className="footer" id="menu-footer" style={{ margin: "5px" }}>
//               <p>
//                 Developed by <strong>Arif Alam</strong>
//               </p>
//               <p>Diploma - CO Second year</p>
//               <p>
//                 Email:{" "}
//                 <a href="mailto:arifalam5841@gmail.com">
//                   arifalam5841@gmail.com
//                 </a>
//               </p>
//             </footer>
//           </div>
//         </div>
//       </div>

//       {/* HOME */}
//       <div id="homepage-container">
//         <div id="slides_container">

//           <div className="slide">
//             <img src="dfd" alt="" />
//             <div id="slideinfo">
//               <p>1235</p>
//               <h1>Important questions (COA)</h1>
//               <p>when Angela and her friend Katherine disappear in the woods.</p>
//               <div>
//                 <span id="age">Deg</span>
//                 <span id="hd">CO</span>
//                 <span id="catog">First year</span>
//               </div>
//               <a href="https://teraboxapp.com/s/1sF_5Bm5Bse1LCfYh7TGETw">
//                 Read
//               </a>
//             </div>
//           </div>

//           <div className="slide">
//             {/* <img src={slide2} alt="" /> */}
//             <div id="slideinfo">
//               <h1>Exam timetable</h1>
//               <p>Lorem ipsum dolor sit amet.</p>
//               <div>
//                 <span id="age">POL</span>
//                 <span id="hd">all</span>
//                 <span id="catog">First year</span>
//               </div>
//               <button>Watch</button>
//             </div>
//           </div>

//           <div className="slide">
//             {/* <img src={slide3} alt="" /> */}
//             <div id="slideinfo">
//               <h1>Event 2024 kalsekar</h1>
//               <p>Lorem ipsum dolor sit amet.</p>
//               <div>
//                 <span id="age">Deg</span>
//                 <span id="hd">all</span>
//                 <span id="catog">second year</span>
//               </div>
//               <button>Watch</button>
//             </div>
//           </div>

//           <div className="slide">
//             {/* <img src={slide4} alt="" /> */}
//             <div id="slideinfo">
//               <h1>PYQs of diploma</h1>
//               <p>Lorem ipsum dolor sit amet.</p>
//               <div>
//                 <span id="age">POL</span>
//                 <span id="hd">AO</span>
//                 <span id="catog">second year</span>
//               </div>
//               <a href="/" id="viewbtn">View</a>
//             </div>
//           </div>

//         </div>

//         <div id="horizontal-menu">
//           <a href="/" id="subject-btn">Subject</a>
//           <a href="/" id="classwork-btn">Classwork</a>
//           <a href="/" id="notice-btn">Notice</a>
//           <a href="/" id="events-btn">Events</a>
//           <a href="/" id="gallery-btn">Gallery</a>
//           <a href="/" id="manual-btn">Manual</a>
//         </div>

//         <div id="home-pages-cont">


//             {/* <StudentSubjectdetail></StudentSubjectdetail> */}

//             {/* <StudentSubject></StudentSubject> */}

//             {/* <StudentClasswork></StudentClasswork> */}
//             {/* <StudentEvent></StudentEvent> */}

//             {/* <StudentManual></StudentManual> */}

//             {/* <StudentTest></StudentTest> */}

//             {/* <StudentNotice></StudentNotice> */}

//             {/* <StudentTimetable></StudentTimetable> */}

//             <StudentGallery></StudentGallery>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;




// ANOTHER  ============================


import React, { useEffect, useState } from "react";

/* Logos & Menu Icons */
import mainlogo from "../assets/img/mainlogo.avif";
import menuicon from "../assets/img/menuicon.png";

/* Sidebar Icons */
import classwork from "../assets/img/classroom.png";
import timetable from "../assets/img/timetable.png";
import test from "../assets/img/test.png";
import book from "../assets/img/book.png";
import manual from "../assets/img/manual.png";
import gallery from "../assets/img/gallery.png";
import about from "../assets/img/about.png";
import contact from "../assets/img/contact.png";

import StudentSubjectdetail from "./StudentSubjectdetail";
import StudentSubject from "./StudentSubject";
import StudentClasswork from "./StudentClasswork";
import StudentEvent from "./StudentEvent";
import StudentManual from "./StudentManual";
import StudentTest from "./StudentTest";
import StudentNotice from "./StudentNotice";
import StudentTimetable from "./StudentTimetable";
import StudentGallery from "./StudentGallery";

const StudentDashboard = () => {

  // 🔹 state
  const [activePage, setActivePage] = useState("gallery");

  const[code, setcode] = useState("n");
  const [subjectcode , setsubjectcode] = useState("n")
  // 🔹 common click handler
  const handleNavClick = (e, page) => {
    e.preventDefault();     // prevent refresh
    setActivePage(page);    // switch component
  };

  useEffect(()=>{
const student = JSON.parse(localStorage.getItem("student"));
console.log("Student code:", student?.code);

  })

  return (
    <div id="main-container">

      {/* MENU */}
      <div id="menu-container">
        <nav id="navbar">
          <div className="logo-main-cont">
            <img src={mainlogo} alt="Main Logo" />
          </div>

          <div id="nav-button-cont">
            <button id="nav-menu-button">
              <img src={menuicon} alt="Menu" />
            </button>
          </div>
        </nav>

        <div id="secondary-menu">
          <ul>
            <a href="/" id="h_classwork_btn"
              onClick={(e) => handleNavClick(e, "classwork")}
            >
              <img src={classwork} alt="" /> Classwork menu
            </a>

            <a href="/" id="h_timetable_btn"
              onClick={(e) => handleNavClick(e, "timetable")}
            >
              <img src={timetable} alt="" /> Timetables
            </a>

            <a href="/" id="h_test_btn"
              onClick={(e) => handleNavClick(e, "test")}
            >
              <img src={test} alt="" /> Tests
            </a>

            <a href="/" id="h_manual_btn"
              onClick={(e) => handleNavClick(e, "manual")}
            >
              <img src={manual} alt="" /> Manual/ Books
            </a>

            <a href="/" id="h_gallery_btn"
              onClick={(e) => handleNavClick(e, "gallery")}
            >
              <img src={gallery} alt="" /> Gallery
            </a>

            <a href="/" id="about-btn"
              onClick={(e) => handleNavClick(e, "notice")}
            >
              <img src={about} alt="" /> About
            </a>

            <a href="/" id="contact-btn"
              onClick={(e) => handleNavClick(e, "notice")}
            >
              <img src={contact} alt="" /> Contact
            </a>
          </ul>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button id="change-branch">Change Branch</button>

            <footer className="footer" id="menu-footer" style={{ margin: "5px" }}>
              <p>
                Developed by <strong>Arif Alam</strong>
              </p>
              <p>Diploma - CO Second year</p>
              <p>
                Email:{" "}
                <a href="mailto:arifalam5841@gmail.com">
                  arifalam5841@gmail.com
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>

      {/* HOME */}
      <div id="homepage-container">


         <div id="slides_container">

           <div className="slide">
             <img src="dfd" alt="" />
             <div id="slideinfo">
               <p>1235</p>
               <h1>Important questions (COA)</h1>
               <p>when Angela and her friend Katherine disappear in the woods.</p>
               <div>
                 <span id="age">Deg</span>
                 <span id="hd">CO</span>
                 <span id="catog">First year</span>
               </div>
               <a href="https://teraboxapp.com/s/1sF_5Bm5Bse1LCfYh7TGETw">
                 Read
               </a>
             </div>
           </div>

           <div className="slide">
             {/* <img src={slide2} alt="" /> */}
             <div id="slideinfo">
               <h1>Exam timetable</h1>
               <p>Lorem ipsum dolor sit amet.</p>
               <div>
                 <span id="age">POL</span>
                 <span id="hd">all</span>
                 <span id="catog">First year</span>
               </div>
               <button>Watch</button>
             </div>
           </div>

           <div className="slide">
             {/* <img src={slide3} alt="" /> */}
             <div id="slideinfo">
               <h1>Event 2024 kalsekar</h1>
               <p>Lorem ipsum dolor sit amet.</p>
               <div>
                 <span id="age">Deg</span>
                 <span id="hd">all</span>
                 <span id="catog">second year</span>
               </div>
               <button>Watch</button>
             </div>
           </div>

           <div className="slide">
             {/* <img src={slide4} alt="" /> */}
             <div id="slideinfo">
               <h1>PYQs of diploma</h1>
               <p>Lorem ipsum dolor sit amet.</p>
               <div>
                 <span id="age">POL</span>
                 <span id="hd">AO</span>
                 <span id="catog">second year</span>
               </div>
               <a href="/" id="viewbtn">View</a>
             </div>
           </div>

        </div>

        <div id="horizontal-menu">
          <a href="/" id="subject-btn"
            onClick={(e) => handleNavClick(e, "subject")}
          >
            Subject
          </a>

          <a href="/" id="classwork-btn"
            onClick={(e) => handleNavClick(e, "classwork")}
          >
            Classwork
          </a>

          <a href="/" id="notice-btn"
            onClick={(e) => handleNavClick(e, "notice")}
          >
            Notice
          </a>

          <a href="/" id="events-btn"
            onClick={(e) => handleNavClick(e, "events")}
          >
            Events
          </a>

          <a href="/" id="gallery-btn"
            onClick={(e) => handleNavClick(e, "gallery")}
          >
            Gallery
          </a>

          <a href="/" id="manual-btn"
            onClick={(e) => handleNavClick(e, "manual")}
          >
            Manual
          </a>
        </div>

        <div id="home-pages-cont">
          {activePage === "subject" && <StudentSubject setActivePage={setActivePage} setcode={setcode} setsubjectcode={setsubjectcode} />}
          {activePage === "classwork" && <StudentClasswork />}
          {activePage === "events" && <StudentEvent />}
          {activePage === "manual" && <StudentManual />}
          {activePage === "test" && <StudentTest />}
          {activePage === "notice" && <StudentNotice />}
          {activePage === "timetable" && <StudentTimetable />}
          {activePage === "gallery" && <StudentGallery />}
          {activePage === "subjectdetail" && <StudentSubjectdetail code={code} subjectcode={subjectcode}></StudentSubjectdetail>}
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
