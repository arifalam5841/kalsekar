// import React from "react";

// const StaffMessage = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Messages</div>

//       <div className="secondary-box">

//                 <div className="staffnotice-wrapper">
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
//           <p className="staffnotice-label space-top">Send a Message</p>

//           <textarea
//             placeholder="About notice..."
//             className="staffnotice-textarea"
//           ></textarea>

//           {/* ================= ACTION BUTTONS ================= */}
//           <div className="staffnotice-actions">
//             <button className="staffnotice-send-btn">SEND</button>

//             {/* hidden input styled like button (your preferred method) */}
          
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffMessage;



import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const StaffMessage = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [message, setMessage] = useState("");

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

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!activeSubject || !message.trim()) {
      alert("Select department and write a message");
      return;
    }

    const typeCode = activeSubject.code; // D1CO / P2ME
    const year = typeCode[1];
    const branch = typeCode.slice(2);
    const degreeLabel = typeCode[0] === "D" ? "Degree" : "Diploma";

    await addDoc(collection(db, "messages"), {
      whosent: staff.name,
      class: `${degreeLabel} ${branch} - ${year}`,
      type: typeCode,
      date: new Date().toLocaleDateString("en-GB"),
      message,
    });

    alert("Message sent ✅");
    setMessage("");
    setActiveSubject(null);
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Messages</div>

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

          <p className="staffnotice-label space-top">Send a Message</p>

          <textarea
            placeholder="About notice..."
            className="staffnotice-textarea"
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>

          <div className="staffnotice-actions">
            <button
              className="staffnotice-send-btn"
              onClick={sendMessage}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMessage;
