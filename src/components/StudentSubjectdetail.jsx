// import React from 'react'

// const StudentSubjectdetail = ({code, subjectcode}) => {
//   console.log("these are from details " +code, subjectcode)
//   return (
//       <div id="subject-detail-page">

//       {/* SYLLABUS SECTION */}
//       <div id="slb-section">
//         <h2 className="sub-heading" id="slb-heading">
//           Syllabus (2024 - 25)
//         </h2>

//         <div id="slb-btn-cont">
//           {/* sylabus button */}
//           <a href="/">Maths</a>
//         </div>
//       </div>

//       {/* PRACTICE QUESTIONS */}
//       <div id="prac-cont" className="sub-primary-cont">
//         <h2 className="sub-heading">Practice question paper</h2>

//         <div id="prac-ques-cont" className="sub-page-grid">

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//         </div>
//       </div>

//       {/* NOTES */}
//       <div id="note-cont" className="sub-primary-cont">
//         <h2 className="sub-heading">Notes</h2>

//         <div id="notes-cont" className="sub-page-grid">

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//           <a href="/" className="prac-block">
//             <div>
//               <h3>Maths (Basic)</h3>
//               <h4>Chap - 3</h4>
//               <p>test paper</p>
//             </div>
//           </a>

//         </div>
//       </div>

//     </div>
//   )
// }

// export default StudentSubjectdetail




import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const StudentSubjectdetail = ({ code, subjectcode }) => {
  console.log("these are from details", code, subjectcode);

  const [syllabus, setSyllabus] = useState(null);
  const [notes, setNotes] = useState([]);
  const [practice, setPractice] = useState([]);

  const SERVER = "http://localhost:5000"; // your node server

  useEffect(() => {
    fetchSyllabus();
    fetchNotes();
    fetchPractice();
  }, [code, subjectcode]);

  /* ================= SYLLABUS ================= */
  const fetchSyllabus = async () => {
    const q = query(
      collection(db, "subjects"),
      where("code", "==", code),
      where("subjectcode", "==", subjectcode)
    );

    const snap = await getDocs(q);
    snap.forEach((doc) => {
      setSyllabus(doc.data().syllabus);
    });
  };

  /* ================= NOTES ================= */
  const fetchNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("code", "==", code),
      where("subjectcode", "==", subjectcode),
      where("status", "==", "notes")
    );

    const snap = await getDocs(q);
    setNotes(snap.docs.map((d) => d.data()));
  };

  /* ================= PRACTICE ================= */
  const fetchPractice = async () => {
    const q = query(
      collection(db, "practicequestion"),
      where("code", "==", code),
      where("subjectcode", "==", subjectcode),
      where("status", "==", "practice")
    );

    const snap = await getDocs(q);
    setPractice(snap.docs.map((d) => d.data()));
  };

  return (
    <div id="subject-detail-page">
      {/* ================= SYLLABUS ================= */}
      <div id="slb-section">
        <h2 className="sub-heading" id="slb-heading">
          Syllabus (2024 - 25)
        </h2>

        <div id="slb-btn-cont">
          {syllabus && (
            <a
              href={`${SERVER}${syllabus.s_pdf}`}
              target="_blank"
              rel="noreferrer"
            >
              {syllabus.title}
            </a>
          )}
        </div>
      </div>

      {/* ================= PRACTICE ================= */}
      <div id="prac-cont" className="sub-primary-cont">
        <h2 className="sub-heading">Practice question paper</h2>

        <div id="prac-ques-cont" className="sub-page-grid">
          {practice.map((p, i) => (
            <a
              key={i}
              href={`${SERVER}${p.question_pdf}`}
              target="_blank"
              rel="noreferrer"
              className="prac-block"
            >
              <div>
                <h3>{p.title}</h3>
                <h4>{code}</h4>
                <p>Practice paper</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ================= NOTES ================= */}
      <div id="note-cont" className="sub-primary-cont">
        <h2 className="sub-heading">Notes</h2>

        <div id="notes-cont" className="sub-page-grid">
          {notes.map((n, i) => (
            <a
              key={i}
              href={`${SERVER}${n.question_pdf}`}
              target="_blank"
              rel="noreferrer"
              className="prac-block"
            >
              <div>
                <h3>{n.title}</h3>
                <h4>{code}</h4>
                <p>Notes</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectdetail;
