// import React from "react";

// const StaffTest = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Tests</div>

//       <div className="secondary-box">


//         <div className="test-wrapper">

//       {/* ================= SELECT SUBJECT ================= */}
//       <p className="test-label">Select subject :</p>

//       <div className="test-subject-box">
//         <button className="test-chip active">
//           Degree - CO (1st year)
//         </button>

//         <button className="test-chip">
//           Diploma - CE (2st year)
//         </button>
//       </div>

//       {/* ================= UPLOAD CLASSWORK ================= */}
//       <p className="test-label test-space-top">
//         Upload Classworks :
//       </p>

//       <div className="test-upload-box">

//         <div className="test-upload-row">
//           <input
//             type="text"
//             placeholder="Test description"
//             className="test-input test-desc-input"
//           />

//           <input
//             type="text"
//             placeholder="DD-MM-YYYY"
//             className="test-input test-date-input"
//           />

//           <label className="test-file-btn">
//             PDF
//             <input type="file" accept="application/pdf" hidden />
//           </label>
//         </div>

//         <button className="test-add-btn">
//           Add
//         </button>

//       </div>

//     </div>
//       </div>
//     </div>
//   );
// };

// export default StaffTest;




import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const StaffTest = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  /* ================= LOAD SUBJECTS ================= */
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

  /* ================= ADD TEST ================= */
  const addTest = async () => {
    if (!activeSubject || !description || !date || !pdfFile) {
      alert("Fill all fields");
      return;
    }

    /* ---- upload pdf ---- */
    const formData = new FormData();
    formData.append("file", pdfFile);

    const res = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      alert("PDF upload failed");
      return;
    }

    /* ---- save to firestore ---- */
    await addDoc(collection(db, "tests"), {
      description,
      date,
      code: activeSubject.code,
      subjectcode : activeSubject.subjectcode,
      subjectname : activeSubject.name,
      pdf: data.pdf,
      teachername: staff.name,
    });

    alert("Test added ✅");

    setDescription("");
    setDate("");
    setPdfFile(null);
    setActiveSubject(null);
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Tests</div>

      <div className="secondary-box">
        <div className="test-wrapper">

          <p className="test-label">Select subject :</p>

          <div className="test-subject-box">
            {subjects.map(sub => (
              <button
                key={sub.id}
                className={`test-chip ${
                  activeSubject?.id === sub.id ? "active" : ""
                }`}
                onClick={() => setActiveSubject(sub)}
              >
                {sub.code[0] === "D" ? "Degree" : "Diploma"} -{" "}
                {sub.code.slice(2)} ({sub.code[1]} year)
              </button>
            ))}
          </div>

          <p className="test-label test-space-top">
            Upload Classworks :
          </p>

          <div className="test-upload-box">
            <div className="test-upload-row">
              <input
                type="text"
                placeholder="Test description"
                className="test-input test-desc-input"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="DD-MM-YYYY"
                className="test-input test-date-input"
                value={date}
                onChange={e => setDate(e.target.value)}
              />

              <label className="test-file-btn">
                PDF
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={e => setPdfFile(e.target.files[0])}
                />
              </label>
            </div>

            <button className="test-add-btn" onClick={addTest}>
              Add
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StaffTest;
