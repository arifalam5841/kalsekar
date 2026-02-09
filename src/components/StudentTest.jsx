// import React from 'react'

// const StudentTest = ({code}) => {
//   return (
//      <div id="test-page">

//       <h1>Test Papers</h1>

//       <div id="test-question-section">

//             <a href="plotterpdf (1).pdf" className="classwork">
//               <h3>Martices</h3>
//               <hr />
//               <p>5/10/24</p>
//               <p>Sandeep wagh</p>
//               <p id="sub-head">MAT</p>
//             </a>

//             <div className="classwork">
//               <h3>Martices</h3>
//               <hr />
//               <p>5/10/24</p>
//               <p>Sandeep wagh</p>
//               <p id="sub-head">MAT</p>
//             </div>

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

// export default StudentTest

import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const SERVER = "http://localhost:5000";

const StudentTest = () => {
  const [tests, setTests] = useState([]);

  /* ================= GET STUDENT ================= */
  const student = JSON.parse(localStorage.getItem("student"));
  const studentCode = student?.code;

  /* ================= FETCH ================= */
  useEffect(() => {
    if (studentCode) fetchTests();
  }, [studentCode]);

  const fetchTests = async () => {
    const snap = await getDocs(collection(db, "tests"));

    const filtered = snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((t) => t.code === studentCode); // ✅ only this student's tests

    setTests(filtered);
  };

  return (
    <div id="test-page">
      <h1>Test Papers</h1>

      <div id="test-question-section">
        {tests.length === 0 ? (
          <p>No tests available</p>
        ) : (
          tests.map((t) => (
            <a
              key={t.id}
              href={`${SERVER}${t.pdf}`}
              target="_blank"
              rel="noreferrer"
              className="classwork"
            >
              {/* description */}
              <h3>{t.description}</h3>

              <hr />

              {/* date */}
              <p>{t.date}</p>

              {/* teacher */}
              <p>{t.teachername}</p>

              {/* first 3 letters of subject */}
              <p id="sub-head">
                {t.subjectname?.substring(0, 3).toUpperCase()}
              </p>
            </a>
          ))
        )}
      </div>

      <footer className="footer">
        <p>
          Developed by <strong>Arif Alam</strong>
        </p>
        <p>Diploma - CO first year</p>
        <p>
          Email:{" "}
          <a href="mailto:arifalam5841@gmail.com">arifalam5841@gmail.com</a>
        </p>
      </footer>
    </div>
  );
};

export default StudentTest;
