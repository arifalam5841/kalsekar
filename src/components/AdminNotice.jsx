// import React from "react";
// import { useState } from "react";

// const AdminNotice = () => {
//   const [notices, setNotices] = useState([
//     {
//       id: 1,
//       date: "11/03/25",
//       type: "DEGREE",
//       branch: "CO",
//       author: "Admin",
//       text: "Exam schedule released for Semester 4 students.",
//     },
//   ]);

//   const removeNotice = (id) => {
//     setNotices((prev) => prev.filter((n) => n.id !== id));
//   };

//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Notice</div>

//       <div className="secondary-box">
//         <div className="notice-container">
//           <h2 className="notice-title">Send a Notice</h2>

//           {/* Type */}
//           <div className="notice-type">
//             <label>
//               <input type="radio" name="type" defaultChecked /> DEGREE
//             </label>

//             <label>
//               <input type="radio" name="type" /> Polytechnic
//             </label>
//           </div> <div className="notice-type">
//             <label>
//               <input type="radio" name="type" defaultChecked /> 1st year
//             </label>

//             <label>
//               <input type="radio" name="type" /> 2nd year
//             </label><label>
//               <input type="radio" name="type" /> 3rd year
//             </label><label>
//               <input type="radio" name="type" /> 4th year
//             </label>
//           </div>

//           {/* Branch tags */}
//           <div className="notice-branches">
//             {["CO", "CE", "ME", "AN", "AO", "MK"].map((b) => (
//               <span key={b} className="notice-tag">
//                 {b}
//               </span>
//             ))}
//           </div>

//           {/* Textarea */}
//           <textarea placeholder="About notice..." className="notice-textarea" />

//           {/* Buttons */}
//           <div className="notice-actions">
//             <button className="notice-send-btn">SEND</button>
//             {/* <div>
//               <span>Add PD</span>
//               <input
//                 type="file"
//                 accept="application/pdf"
//                 className="notice-hidden-input"
//               />
//             </div> */}

//             <div className="notice-file-upload">
//               <label className="notice-pdf-btn">
//                 📎 Add PDF
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   className="notice-hidden-input"
//                 />
//               </label>
//             </div>
//           </div>

//           {/* ===== ALL NOTICES ===== */}
//           <h3 className="notice-subtitle">ALL NOTICES</h3>

//           <div className="notice-list">
//             {notices.map((n) => (
//               <div key={n.id} className="notice-card">
//                 <div className="notice-card-header">
//                   <span className="notice-date">Date - {n.date}</span>
//                 </div>

//                 <div className="notice-card-body">
//                   <div className="notice-meta">
//                     <span className="notice-badge">{n.type}</span>
//                     <span className="notice-dot"></span>
//                     <span className="notice-branch">{n.branch}</span>
//                   </div>

//                   <p className="notice-text">{n.text}</p>

//                   <div className="notice-footer">
//                     <span className="notice-author">- {n.author}</span>

//                     <button
//                       className="notice-remove-btn"
//                       onClick={() => removeNotice(n.id)}
//                     >
//                       REMOVE
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminNotice;


// import React, { useEffect, useState } from "react";

// const AdminNotice = () => {
//   const [notices, setNotices] = useState([]);

//   const [type, setType] = useState("D"); // D / P
//   const [year, setYear] = useState("1");
//   const [branch, setBranch] = useState("CO");
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);

//   /* ================= FETCH ================= */
//   const fetchNotices = async () => {
//     const res = await fetch("http://localhost:5000/api/notices");
//     const data = await res.json();
//     setNotices(data || []);
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   /* ================= SEND ================= */
//   const sendNotice = async () => {
//     if (!text) return alert("Enter description");

//     const code = `${type}${year}${branch}`; // D1CO
//     const className = `${type === "D" ? "Degree" : "Polytechnic"} ${branch}-${year}`;

//     const formData = new FormData();
//     formData.append("date", new Date().toLocaleDateString());
//     formData.append("type", code);
//     formData.append("className", className);
//     formData.append("author", "Kalsekar Administration");
//     formData.append("text", text);

//     if (file) formData.append("file", file);

//     const res = await fetch("http://localhost:5000/api/notices", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert("Notice sent ✅");
//       setText("");
//       setFile(null);
//       fetchNotices();
//     } else {
//       alert("Failed ❌");
//     }
//   };

//   /* ================= DELETE ================= */
//   const removeNotice = async (id) => {
//     await fetch(`http://localhost:5000/api/notices/${id}`, {
//       method: "DELETE",
//     });
//     fetchNotices();
//   };

//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Notice</div>

//       <div className="secondary-box">
//         <div className="notice-container">
//           <h2 className="notice-title">Send a Notice</h2>

//           {/* Degree / Poly */}
//           <div className="notice-type">
//             <label>
//               <input
//                 type="radio"
//                 checked={type === "D"}
//                 onChange={() => setType("D")}
//               />
//               DEGREE
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 checked={type === "P"}
//                 onChange={() => setType("P")}
//               />
//               POLYTECHNIC
//             </label>
//           </div>

//           {/* Year */}
//           <div className="notice-type">
//             {[1, 2, 3, 4].map((y) => (
//               <label key={y}>
//                 <input
//                   type="radio"
//                   checked={year === String(y)}
//                   onChange={() => setYear(String(y))}
//                 />
//                 {y} Year
//               </label>
//             ))}
//           </div>

//           {/* Branch */}
//           <div className="notice-branches">
//             {["CO", "CE", "ME", "AN", "AO", "MK"].map((b) => (
//               <span
//                 key={b}
//                 className={`notice-tag ${branch === b ? "active" : ""}`}
//                 onClick={() => setBranch(b)}
//                 style={{ cursor: "pointer" }}
//               >
//                 {b}
//               </span>
//             ))}
//           </div>

//           {/* Text */}
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="About notice..."
//             className="notice-textarea"
//           />

//           {/* Actions */}
//           <div className="notice-actions">
//             <button className="notice-send-btn" onClick={sendNotice}>
//               SEND
//             </button>

//             <label className="notice-pdf-btn">
//               📎 Add PDF/Image
//               <input
//                 type="file"
//                 accept=".pdf,image/*"
//                 hidden
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </label>
//           </div>

//           {/* LIST */}
//           <h3 className="notice-subtitle">ALL NOTICES</h3>

//           <div className="notice-list">
//             {notices.map((n) => (
//               <div key={n._id} className="notice-card">
//                 <div className="notice-card-header">
//                   <span>Date - {n.date}</span>
//                 </div>

//                 <div className="notice-card-body">
//                   <div className="notice-meta">
//                     <span className="notice-badge">{n.type}</span>
//                     <span>{n.class}</span>
//                   </div>

//                   <p>{n.description}</p>

//                   {n.pdf && (
//                     <a href={`http://localhost:5000${n.pdf}`} target="_blank">
//                       View PDF
//                     </a>
//                   )}

//                   <div className="notice-footer">
//                     <span>- {n.whosent}</span>

//                     <button
//                       className="notice-remove-btn"
//                       onClick={() => removeNotice(n._id)}
//                     >
//                       REMOVE
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminNotice;


import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);

  const [type, setType] = useState("D"); // D / P
  const [year, setYear] = useState("1");
  const [branch, setBranch] = useState("CO");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  /* 🔥 Firestore reference */
  const noticeRef = collection(db, "notice");

  /* ================= FETCH (SERVER) ================= */
  const fetchNotices = async () => {
    const res = await fetch("http://localhost:5000/api/notices");
    const data = await res.json();
    setNotices(data || []);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  /* ================= SEND ================= */
  const sendNotice = async () => {
    if (!text) return alert("Enter description");

    const code = `${type}${year}${branch}`; // D1CO
    const className = `${
      type === "D" ? "Degree" : "Polytechnic"
    } ${branch}-${year}`;

    const today = new Date().toLocaleDateString();

    const formData = new FormData();
    formData.append("date", today);
    formData.append("type", code);
    formData.append("className", className);
    formData.append("author", "Kalsekar Administration");
    formData.append("text", text);

    if (file) formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      /* 🔥 STORE IN FIREBASE */
      try {
        await addDoc(noticeRef, {
          whosent: "Kalsekar Administration",
          class: className,
          type: code,
          date: today,
          description: text,
          pdf: data.pdf || "", // server saved path
        });
      } catch (err) {
        console.error("Firestore error:", err);
      }

      alert("Notice sent ✅");
      setText("");
      setFile(null);
      fetchNotices();
    } else {
      alert("Failed ❌");
    }
  };

  /* ================= DELETE ================= */
  const removeNotice = async (id) => {
    await fetch(`http://localhost:5000/api/notices/${id}`, {
      method: "DELETE",
    });
    fetchNotices();
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Notice</div>

      <div className="secondary-box">
        <div className="notice-container">
          <h2 className="notice-title">Send a Notice</h2>

          {/* Degree / Poly */}
          <div className="notice-type">
            <label>
              <input
                type="radio"
                checked={type === "D"}
                onChange={() => setType("D")}
              />
              DEGREE
            </label>

            <label>
              <input
                type="radio"
                checked={type === "P"}
                onChange={() => setType("P")}
              />
              POLYTECHNIC
            </label>
          </div>

          {/* Year */}
          <div className="notice-type">
            {[1, 2, 3, 4].map((y) => (
              <label key={y}>
                <input
                  type="radio"
                  checked={year === String(y)}
                  onChange={() => setYear(String(y))}
                />
                {y} Year
              </label>
            ))}
          </div>

          {/* Branch */}
          <div className="notice-branches">
            {["CO", "CE", "ME", "AN", "AO", "MK"].map((b) => (
              <span
                key={b}
                className={`notice-tag ${branch === b ? "active" : ""}`}
                onClick={() => setBranch(b)}
                style={{ cursor: "pointer" }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Text */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="About notice..."
            className="notice-textarea"
          />

          {/* Actions */}
          <div className="notice-actions">
            <button className="notice-send-btn" onClick={sendNotice}>
              SEND
            </button>

            <label className="notice-pdf-btn">
              📎 Add PDF/Image
              <input
                type="file"
                accept=".pdf,image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* LIST */}
          <h3 className="notice-subtitle">ALL NOTICES</h3>

          <div className="notice-list">
            {notices.map((n) => (
              <div key={n._id} className="notice-card">
                <div className="notice-card-header">
                  <span>Date - {n.date}</span>
                </div>

                <div className="notice-card-body">
                  <div className="notice-meta">
                    <span className="notice-badge">{n.type}</span>
                    <span>{n.class}</span>
                  </div>

                  <p>{n.description}</p>

                  {n.pdf && (
                    <a href={`http://localhost:5000${n.pdf}`} target="_blank">
                      View PDF
                    </a>
                  )}

                  <div className="notice-footer">
                    <span>- {n.whosent}</span>

                    <button
                      className="notice-remove-btn"
                      onClick={() => removeNotice(n._id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotice;
