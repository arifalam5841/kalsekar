// import React from "react";

// const StaffManual = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Manuals/Books
// </div>

//       <div className="secondary-box">


//    <div className="manual-wrapper">

//       {/* ================= SELECT DEPARTMENT ================= */}
//       <p className="manual-label">Select Department :</p>

//       <div className="manual-dept-box">
//         <button className="manual-chip active">
//           Degree - CO (1st year)
//         </button>

//         <button className="manual-chip">
//           Diploma - CE (2st year)
//         </button>
//       </div>



//       {/* ================= ADD MANUAL ================= */}
//       <p className="manual-label space-top">
//         Add new Manual / Book :
//       </p>

//       <div className="manual-form-box">

//         <input
//           type="text"
//           placeholder="Manual name..."
//           className="manual-input"
//         />

//         <input
//           type="text"
//           placeholder="Description"
//           className="manual-input"
//         />


//         <div className="manual-actions">

//           <div className="manual-left-actions">
//             <label className="manual-file-btn">
//               Add PDF
//               <input type="file" accept="application/pdf" hidden />
//             </label>

//             <label className="manual-file-btn">
//               Cover page
//               <input type="file" accept="image/*" hidden />
//             </label>
//           </div>

//           <button className="manual-send-btn">
//             SEND
//           </button>

//         </div>
//       </div>

//     </div>

//       </div>
//     </div>
//   );
// };

// export default StaffManual;



import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const StaffManual = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

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

  /* ================= ADD MANUAL ================= */
  const addManual = async () => {
    if (!activeSubject || !title || !description || !pdfFile || !coverImg) {
      alert("Fill all fields");
      return;
    }

    /* ---- upload pdf (or image → pdf) ---- */
    const pdfForm = new FormData();
    pdfForm.append("file", pdfFile);

    const pdfRes = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      body: pdfForm,
    });

    const pdfData = await pdfRes.json();
    if (!pdfData.success) {
      alert("PDF upload failed");
      return;
    }

    /* ---- upload cover image ---- */
    const imgForm = new FormData();
    imgForm.append("file", coverImg);

    const imgRes = await fetch("http://localhost:5000/api/upload-image", {
      method: "POST",
      body: imgForm,
    });

    const imgData = await imgRes.json();
    if (!imgData.success) {
      alert("Image upload failed");
      return;
    }

    /* ---- store in firestore ---- */
    await addDoc(collection(db, "books"), {
      title,
      description,
      code: activeSubject.code,
      manual_pdf: pdfData.pdf,
      img: imgData.img,
    });

    alert("Manual added ✅");

    setTitle("");
    setDescription("");
    setPdfFile(null);
    setCoverImg(null);
    setActiveSubject(null);
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Manuals/Books</div>

      <div className="secondary-box">
        <div className="manual-wrapper">
          <p className="manual-label">Select Department :</p>

          <div className="manual-dept-box">
            {subjects.map(sub => (
              <button
                key={sub.id}
                className={`manual-chip ${
                  activeSubject?.id === sub.id ? "active" : ""
                }`}
                onClick={() => setActiveSubject(sub)}
              >
                {sub.code[0] === "D" ? "Degree" : "Diploma"} -{" "}
                {sub.code.slice(2)} ({sub.code[1]} year)
              </button>
            ))}
          </div>

          <p className="manual-label space-top">
            Add new Manual / Book :
          </p>

          <div className="manual-form-box">
            <input
              type="text"
              placeholder="Manual name..."
              className="manual-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              className="manual-input"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="manual-actions">
              <div className="manual-left-actions">
                <label className="manual-file-btn">
                  Add PDF
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    hidden
                    onChange={e => setPdfFile(e.target.files[0])}
                  />
                </label>

                <label className="manual-file-btn">
                  Cover page
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={e => setCoverImg(e.target.files[0])}
                  />
                </label>
              </div>

              <button
                className="manual-send-btn"
                onClick={addManual}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManual;
