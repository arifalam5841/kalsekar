// import React from 'react'

// const StudentSubject = ({code, subjectcode}) => {
//   return (
//       <div id="subjects-page">

//       <h3>Study material</h3>
//       <span>
//         A quick access features related to Diploma Computer Science First Year
//       </span>

//       <div id="subs-cont">

//         <a className="sub" href="/">
//           <div id="sub-inner-cont">
//             <img src="imgs/math.png" alt="loading" />
//             <p>Maths 2</p>
//           </div>
//         </a>

//         <div className="sub">
//           <div
//             id="sub-inner-cont"
//             style={{ backgroundColor: "pink" }}
//           >
//             <img src="imgs/physic.png" alt="loading" />
//             <p>Physics</p>
//           </div>
//         </div>

//         <div className="sub">
//           <div
//             id="sub-inner-cont"
//             style={{ backgroundColor: "rgb(233, 241, 140)" }}
//           >
//             <img src="imgs/python.png" alt="loading" />
//             <p>Python</p>
//           </div>
//         </div>

//         <div className="sub">
//           <div
//             id="sub-inner-cont"
//             style={{ backgroundColor: "rgb(161, 225, 151)" }}
//           >
//             <img src="imgs/database.png" alt="loading" />
//             <p>DMS</p>
//           </div>
//         </div>

//         <div className="sub">
//           <div
//             id="sub-inner-cont"
//             style={{ backgroundColor: "rgb(206, 151, 225)" }}
//           >
//             <img src="imgs/chem.png" alt="loading" />
//             <p>Chemistry</p>
//           </div>
//         </div>

//       </div>

//       <footer className="footer">
//         <p>
//           Developed by <strong>Arif Alam</strong>
//         </p>
//         <p>Diploma - CO first year</p>
//         <p>
//           Email:{" "}
//           <a href="mailto:arifalam5841@gmail.com">
//             arifalam5841@gmail.com
//           </a>
//         </p>
//       </footer>

//     </div>
//   )
// }

// export default StudentSubject


// ANOTHER 

import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/* thumbnails */
import s1 from "../assets/img/s1.png";
import s2 from "../assets/img/s2.png";
import s3 from "../assets/img/s3.png";
import s4 from "../assets/img/s4.png";
import s5 from "../assets/img/s5.png";
import s7 from "../assets/img/s7.png";

const thumbs = [s1, s2, s3, s4, s5, s7];

/* light random colors */
const lightColors = [
  "#fde2e4",
  "#e2ece9",
  "#e4c1f9",
  "#f1faee",
  "#fff1c1",
  "#d0f4de",
  "#fce1e4",
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const StudentSubject = ({setActivePage,setsubjectcode,setcode}) => {
  const student = JSON.parse(localStorage.getItem("student"));
  const studentCode = student?.code; // e.g. D2CO

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!studentCode) return;

    const fetchSubjects = async () => {
      try {
        const q = query(
          collection(db, "subjects"),
          where("code", "==", studentCode)
        );

        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          bg: getRandom(lightColors),
          img: getRandom(thumbs),
        }));

        setSubjects(list);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, [studentCode]);

  return (
    <div id="subjects-page">
      <h3>Study material</h3>
      <span>
        A quick access features related to your selected course
      </span>

      <div id="subs-cont">
        {subjects.map((sub) => (
          <a className="sub" href="/" key={sub.id}>
            <div
              id="sub-inner-cont"
              style={{ backgroundColor: sub.bg }}

              onClick={(e)=>{
                e.preventDefault()

                setActivePage("subjectdetail")
                setcode(sub.code)
                setsubjectcode(sub.subjectcode)
                // console.log(sub.code, sub.subjectcode)
              }}
            >
              <img src={sub.img} alt="loading"  className="subimg"/>
              <p>{sub.name}</p>
            </div>
          </a>
        ))}

        {subjects.length === 0 && (
          <p style={{ opacity: 0.6 }}>No subjects available</p>
        )}
      </div>

      <footer className="footer">
        <p>
          Developed by <strong>Arif Alam</strong>
        </p>
        <p>{studentCode}</p>
        <p>
          Email:{" "}
          <a href="mailto:arifalam5841@gmail.com">
            arifalam5841@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default StudentSubject;
