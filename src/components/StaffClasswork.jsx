// import React from "react";

// const StaffClasswork = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Classwork
// </div>

//       <div className="secondary-box">
//         <div className="classwork-wrapper">
//           {/* ================= SELECT SUBJECT ================= */}
//           <p className="classwork-label">Select subject :</p>

//           <div className="classwork-subject-box">
//             <button className="classwork-chip active">
//               Degree - CO (1st year)
//             </button>

//             <button className="classwork-chip">Diploma - CE (2st year)</button>
//           </div>

//           {/* ================= UPLOAD CLASSWORK ================= */}
//           <p className="classwork-label space-top">Upload Classworks :</p>

//           <div className="classwork-upload-box">
//             <input
//               type="text"
//               placeholder="Chapter name"
//               className="classwork-input name"
//             />

//             <input type="date" className="classwork-input date" />

//             <label className="classwork-file-btn">
//               PDF
//               <input type="file" accept="application/pdf" hidden />
//             </label>

//             <button className="classwork-add-btn">Add</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffClasswork;


import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const StaffClasswork = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  const [chapter, setChapter] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

  // 🔹 Load subjects of logged-in teacher
  useEffect(() => {
    const fetchSubjects = async () => {
      const q = query(
        collection(db, "subjects"),
        where("teacheruserid", "==", staff.userid)
      );
      const snap = await getDocs(q);
      setSubjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchSubjects();
  }, [staff.userid]);

  // 🔹 Upload classwork
  const addClasswork = async () => {
    if (!activeSubject || !file || !chapter || !date) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) {
      alert("Upload failed");
      return;
    }

    await addDoc(collection(db, "classwork"), {
      title: chapter,
      code: activeSubject.code,
      subjectcode: activeSubject.subjectcode,
      date,
      teacher: staff.name,
      subject: activeSubject.name.substring(0, 3).toUpperCase(),
      ques_pdf: data.pdf.replace("/pdfs/", "/pdfs/"),
    });

    alert("Classwork added ✅");
    setChapter("");
    setDate("");
    setFile(null);
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Classwork</div>

      <div className="secondary-box">
        <div className="classwork-wrapper">
          <p className="classwork-label">Select subject :</p>

          <div className="classwork-subject-box">
            {subjects.map(sub => (
              <button
                key={sub.id}
                className={`classwork-chip ${
                  activeSubject?.id === sub.id ? "active" : ""
                }`}
                onClick={() => setActiveSubject(sub)}
              >

              {sub.code[0] == "D" ? "Deggree" : "Polytechnic"} - {sub.code[2]+sub.code[3]}({sub.code[1]} year) {sub.name.toUpperCase()}
              </button>
            ))}
          </div>

          <p className="classwork-label space-top">
            Upload Classworks :
          </p>

          <div className="classwork-upload-box">
            <input
              type="text"
              placeholder="Chapter name"
              className="classwork-input name"
              value={chapter}
              onChange={e => setChapter(e.target.value)}
            />

            <input
              type="date"
              className="classwork-input date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <label className="classwork-file-btn">
              PDF
              <input
                type="file"
                accept="application/pdf,image/*"
                hidden
                onChange={e => setFile(e.target.files[0])}
              />
            </label>

            <button className="classwork-add-btn" onClick={addClasswork}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffClasswork;
