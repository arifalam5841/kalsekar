// import React from "react";

// const AdminTimetable = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Time Tables
// </div>

//       <div className="secondary-box">


//  <div className="tt-wrapper">

//       {/* ================= FORM ================= */}
//       <h2 className="tt-title">Add Time table</h2>

//       <div className="tt-form">

//         {/* Degree / Poly */}
//         <div className="tt-radio-row">
//           <label><input type="radio" name="type" /> Degree</label>
//           <label><input type="radio" name="type" /> Polytechnic</label>
//         </div>

//         {/* Course + Year */}
//         <div className="tt-row">
//           <select className="tt-input">
//             <option>Computer science</option>
//           </select>

//           <select className="tt-input">
//             <option>1st Year</option>
//           </select>
//         </div>

//         {/* Academic year */}
//         <p className="tt-label">Academic year</p>
//         <div className="tt-row">
//           <input type="date" className="tt-input" />
//           <span className="tt-to">To</span>
//           <input type="date" className="tt-input" />
//         </div>

//         {/* Semester */}
//         <p className="tt-label">SEM</p>
//         <select className="tt-input small">
//           <option>1st</option>
//         </select>

//         {/* File upload (standard pattern you like) */}
//         <label className="tt-upload-btn">
//           📎 Add Time Table (PDF / Image)
//           <input type="file" hidden />
//         </label>

//         <button className="tt-submit-btn">Upload</button>

//       </div>


//       {/* ================= LIST SECTION ================= */}
//       <h2 className="tt-section-title">All Time Tables</h2>

//       <div className="tt-list">

//         {/* CARD */}
//         <div className="tt-card">

//           <img
//             src="https://via.placeholder.com/120x90"
//             alt="timetable"
//             className="tt-thumb"
//           />

//           <div className="tt-details">
//             <h3>Computer Science - 1st Year</h3>
//             <p>🎓 Degree</p>
//             <p>📅 2025 → 2026</p>
//             <p>📘 SEM 1</p>
//           </div>

//           <button className="tt-remove-btn">Remove</button>

//         </div>

//       </div>

//     </div>

//       </div>
//     </div>
//   );
// };

// export default AdminTimetable;



import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const AdminTimetable = () => {
  const ttRef = collection(db, "timetables");

  const [tables, setTables] = useState([]);

  const [type, setType] = useState("D");
  const [year, setYear] = useState("1");
  const [branch, setBranch] = useState("AO");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sem, setSem] = useState("1");
  const [file, setFile] = useState(null);

  /* ================= FETCH ================= */
  const fetchTables = async () => {
    const snap = await getDocs(ttRef);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTables(list);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  /* ================= UPLOAD ================= */
  const uploadTimetable = async () => {
    if (!file) return alert("Select image");

    try {
      const fd = new FormData();
      fd.append("file", file);

      // upload image to backend
      const res = await fetch("http://localhost:5000/api/upload-image", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!data.success) {
        alert("Image upload failed ❌");
        return;
      }

      const academic = `${from.slice(0, 4)}-${to.slice(2, 4)}`;

      await addDoc(ttRef, {
        img: data.img, // only filename
        type,
        year,
        class: branch,
        academic,
        sem,
        pdf: "",
      });

      alert("Timetable added ✅");

      setFile(null);
      fetchTables();
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };

  /* ================= DELETE ================= */
  const removeTable = async (id) => {
    await deleteDoc(doc(db, "timetables", id));
    fetchTables();
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Time Tables</div>

      <div className="secondary-box">
        <div className="tt-wrapper">

          <h2 className="tt-title">Add Time table</h2>

          <div className="tt-form">

            {/* Degree / Poly */}
            <div className="tt-radio-row">
              <label>
                <input
                  type="radio"
                  checked={type === "D"}
                  onChange={() => setType("D")}
                />
                Degree
              </label>

              <label>
                <input
                  type="radio"
                  checked={type === "P"}
                  onChange={() => setType("P")}
                />
                Polytechnic
              </label>
            </div>

            {/* Branch + Year */}
            <div className="tt-row">
              <select
                className="tt-input"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {["CO", "CE", "ME", "AO", "AN", "MK"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <select
                className="tt-input"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>
                    {y} Year
                  </option>
                ))}
              </select>
            </div>

            {/* Academic year */}
            <p className="tt-label">Academic year</p>
            <div className="tt-row">
              <input
                type="date"
                className="tt-input"
                onChange={(e) => setFrom(e.target.value)}
              />
              <span className="tt-to">To</span>
              <input
                type="date"
                className="tt-input"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            {/* Semester (1 + 2 added) */}
            <p className="tt-label">SEM</p>
            <select
              className="tt-input small"
              value={sem}
              onChange={(e) => setSem(e.target.value)}
            >
              <option value="1">1st</option>
              <option value="2">2nd</option>
            </select>

            {/* Image only */}
            <label className="tt-upload-btn">
              📎 Add Time Table (Image only)
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <button className="tt-submit-btn" onClick={uploadTimetable}>
              Upload
            </button>
          </div>

          {/* LIST */}
          <h2 className="tt-section-title">All Time Tables</h2>

          <div className="tt-list">
            {tables.map((t) => (
              <div key={t.id} className="tt-card">
                <img
                  src={`http://localhost:5000${t.img}`}
                  alt="timetable"
                  className="tt-thumb"
                />

                <div className="tt-details">
                  <h3>{t.class} - {t.year} Year</h3>
                  <p>🎓 {t.type === "D" ? "Degree" : "Polytechnic"}</p>
                  <p>📅 {t.academic}</p>
                  <p>📘 SEM {t.sem}</p>
                </div>

                <button
                  className="tt-remove-btn"
                  onClick={() => removeTable(t.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminTimetable;
