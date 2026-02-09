// import React from "react";

// const StaffNotice = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Notices</div>

//       <div className="secondary-box">
//         <div className="staffnotice-wrapper">
//           {/* ================= SELECT DEPARTMENT ================= */}
//           <p className="staffnotice-label">Select Department :</p>

//           <div className="staffnotice-dept-box">
//             <button className="staffnotice-chip active">
//               Degree - CO (1st year)
//             </button>

//             <button className="staffnotice-chip">
//               Diploma - CE (2st year)
//             </button>
//           </div>

//           {/* ================= SEND NOTICE ================= */}
//           <p className="staffnotice-label space-top">Send a Notice</p>

//           <textarea
//             placeholder="About notice..."
//             className="staffnotice-textarea"
//           ></textarea>

//           {/* ================= ACTION BUTTONS ================= */}
//           <div className="staffnotice-actions">
//             <button className="staffnotice-send-btn">SEND</button>

//             {/* hidden input styled like button (your preferred method) */}
//             <label className="staffnotice-file-btn">
//               Add PDF
//               <input type="file" accept="application/pdf" hidden />
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffNotice;



import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const StaffNotice = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  /* ================= LOAD TEACHER SUBJECTS ================= */
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

  /* ================= SEND NOTICE ================= */
  const sendNotice = async () => {
    if (!activeSubject || !description) {
      alert("Select department and enter notice text");
      return;
    }

    let pdfPath = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        alert("File upload failed");
        return;
      }

      pdfPath = data.pdf;
    }

    const typeCode = activeSubject.code; // D1CO / P2ME
    const year = typeCode[1];
    const branch = typeCode.slice(2);
    const degreeLabel = typeCode[0] === "D" ? "Degree" : "Diploma";

    await addDoc(collection(db, "notice"), {
      whosent: staff.name,
      class: `${degreeLabel} ${branch} - ${year}`,
      type: typeCode,
      date: new Date().toLocaleDateString("en-GB"),
      pdf: pdfPath || null,
      description,
    });

    alert("Notice sent ✅");
    setDescription("");
    setFile(null);
    setActiveSubject(null);
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Notices</div>

      <div className="secondary-box">
        <div className="staffnotice-wrapper">
          <p className="staffnotice-label">Select Department :</p>

          <div className="staffnotice-dept-box">
            {subjects.map(sub => (
              <button
                key={sub.id}
                className={`staffnotice-chip ${
                  activeSubject?.id === sub.id ? "active" : ""
                }`}
                onClick={() => setActiveSubject(sub)}
              >
                {sub.code[0] === "D" ? "Degree" : "Diploma"} -{" "}
                {sub.code.slice(2)} ({sub.code[1]} year)
              </button>
            ))}
          </div>

          <p className="staffnotice-label space-top">Send a Notice</p>

          <textarea
            placeholder="About notice..."
            className="staffnotice-textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>

          <div className="staffnotice-actions">
            <button
              className="staffnotice-send-btn"
              onClick={sendNotice}
            >
              SEND
            </button>

            <label className="staffnotice-file-btn">
              Add PDF
              <input
                type="file"
                accept="application/pdf,image/*"
                hidden
                onChange={e => setFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffNotice;
