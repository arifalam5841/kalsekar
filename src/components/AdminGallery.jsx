// import React from "react";

// const AdminGallery = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Gallery</div>

//       <div className="secondary-box">

//            <div className="gallery-wrapper">

//       {/* ================= TOP SECTION ================= */}
//       <div className="gallery-top-box">

//         <div className="gallery-type-toggle">
//           <button className="gallery-type-btn">DEGREE</button>
//           <button className="gallery-type-btn active">POLYTECHNIC</button>
//         </div>

//         <div className="gallery-add-row">
//           <input
//             type="text"
//             placeholder="section name..."
//             className="gallery-input"
//           />
//           <button className="gallery-add-btn">ADD</button>
//         </div>

//       </div>

//       {/* ================= POLYTECHNIC ================= */}
//       <h3 className="gallery-title">Polytechnic :</h3>

//       <div className="gallery-upload-box">

//         <select className="gallery-select">
//           <option>Section</option>
//         </select>

//         {/* Styled image button */}
//         <label className="gallery-file-btn">
//           Add Image
//           <input type="file" accept="image/*" hidden />
//         </label>

//         <button className="gallery-upload-btn">Upload</button>

//       </div>

//       {/* ================= DEGREE ================= */}
//       <h3 className="gallery-title">Degree :</h3>

//       <div className="gallery-upload-box">

//         <select className="gallery-select">
//           <option>Section</option>
//         </select>

//         {/* Styled image button */}
//         <label className="gallery-file-btn">
//            Add Image
//           <input type="file" accept="image/*" hidden />
//         </label>

//         <button className="gallery-upload-btn">Upload</button>

//       </div>

//     </div>
//       </div>
//     </div>
//   );
// };

// export default AdminGallery;

// import React, { useEffect, useState } from "react";
// import { db } from "../utils/firebase";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// const AdminGallery = () => {
//   const [type, setType] = useState("polytechnic");

//   const [sectionName, setSectionName] = useState("");
//   const [sections, setSections] = useState([]);

//   const [polySection, setPolySection] = useState("");
//   const [degSection, setDegSection] = useState("");

//   const [polyFile, setPolyFile] = useState(null);
//   const [degFile, setDegFile] = useState(null);

//   /* ================= FETCH ================= */
//   const fetchSections = async (t) => {
//     const snap = await getDoc(doc(db, "gallery", t));

//     if (!snap.exists()) {
//       await setDoc(doc(db, "gallery", t), { sections: [] });
//       setSections([]);
//       return;
//     }

//     const data = snap.data().sections || [];
//     setSections(data);

//     if (data.length) {
//       if (t === "polytechnic") setPolySection(data[0].section);
//       if (t === "degree") setDegSection(data[0].section);
//     }
//   };

//   useEffect(() => {
//     fetchSections(type);
//   }, [type]);

//   /* ================= ADD SECTION ================= */
//   const addSection = async () => {
//     if (!sectionName) return alert("Enter section");

//     const newSections = [...sections, { section: sectionName, img_list: [] }];

//     await updateDoc(doc(db, "gallery", type), {
//       sections: newSections,
//     });

//     setSectionName("");
//     fetchSections(type);
//   };

//   /* ================= UPLOAD ================= */
//   const uploadImage = async (selectedSection, file, t) => {
//     if (!file || !selectedSection) return alert("Select section + image");

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("http://localhost:5000/api/upload-image", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (!data.success) return alert("Upload failed");

//     const imgPath = data.img;

//     const updated = sections.map((s) =>
//       s.section === selectedSection
//         ? { ...s, img_list: [...s.img_list, imgPath] }
//         : s,
//     );

//     await updateDoc(doc(db, "gallery", t), {
//       sections: updated,
//     });

//     fetchSections(t);
//   };

//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Gallery</div>

//       <div className="secondary-box">
//         <div className="gallery-wrapper">
//           {/* ================= TOP SECTION ================= */}
//           <div className="gallery-top-box">
//             <div className="gallery-type-toggle">
//               <button
//                 className={`gallery-type-btn ${type === "degree" ? "active" : ""}`}
//                 onClick={() => setType("degree")}
//               >
//                 DEGREE
//               </button>

//               <button
//                 className={`gallery-type-btn ${type === "polytechnic" ? "active" : ""}`}
//                 onClick={() => setType("polytechnic")}
//               >
//                 POLYTECHNIC
//               </button>
//             </div>

//             <div className="gallery-add-row">
//               <input
//                 type="text"
//                 placeholder="section name..."
//                 className="gallery-input"
//                 value={sectionName}
//                 onChange={(e) => setSectionName(e.target.value)}
//               />
//               <button className="gallery-add-btn" onClick={addSection}>
//                 ADD
//               </button>
//             </div>
//           </div>

//           {/* ================= POLYTECHNIC ================= */}
//           <h3 className="gallery-title">Upload images :</h3>

//           <div className="gallery-upload-box">
//             <select
//               className="gallery-select"
//               value={polySection}
//               onChange={(e) => setPolySection(e.target.value)}
//             >
//               {sections.map((s) => (
//                 <option key={s.section}>{s.section}</option>
//               ))}
//             </select>

//             <label className="gallery-file-btn">
//               Add Image
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={(e) => setPolyFile(e.target.files[0])}
//               />
//             </label>

//             <button
//               className="gallery-upload-btn"
//               onClick={() => uploadImage(polySection, polyFile, "polytechnic")}
//             >
//               Upload
//             </button>
//           </div>

//           <div
//             style={{
//               marginTop: 20,
//               display: "flex",
//               gap: 10,
//               flexWrap: "wrap",
//             }}
//           >
//             {sections
//               .find((s) => s.section === selectedSection)
//               ?.img_list.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`http://localhost:5000${img}`}
//                   alt=""
//                   style={{ width: 120, borderRadius: 6 }}
//                 />
//               ))}
//           </div>

//           {/* ================= DEGREE ================= */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminGallery;




import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AdminGallery = () => {
  const [type, setType] = useState("polytechnic");

  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);

  const [polySection, setPolySection] = useState("");
  const [degSection, setDegSection] = useState("");

  const [polyFile, setPolyFile] = useState(null);
  const [degFile, setDegFile] = useState(null);

  /* ================= FETCH ================= */
  const fetchSections = async (t) => {
    const snap = await getDoc(doc(db, "gallery", t));

    if (!snap.exists()) {
      await setDoc(doc(db, "gallery", t), { sections: [] });
      setSections([]);
      return;
    }

    const data = snap.data().sections || [];
    setSections(data);

    if (data.length) {
      if (t === "polytechnic") setPolySection(data[0].section);
      if (t === "degree") setDegSection(data[0].section);
    }
  };

  useEffect(() => {
    fetchSections(type);
  }, [type]);

  /* ================= ADD SECTION ================= */
  const addSection = async () => {
    if (!sectionName) return alert("Enter section");

    const newSections = [...sections, { section: sectionName, img_list: [] }];

    await updateDoc(doc(db, "gallery", type), {
      sections: newSections,
    });

    setSectionName("");
    fetchSections(type);
  };

  /* ================= UPLOAD ================= */
  const uploadImage = async (selectedSection, file, t) => {
    if (!file || !selectedSection) return alert("Select section + image");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) return alert("Upload failed");

    const imgPath = data.img;

    const updated = sections.map((s) =>
      s.section === selectedSection
        ? { ...s, img_list: [...s.img_list, imgPath] }
        : s
    );

    await updateDoc(doc(db, "gallery", t), {
      sections: updated,
    });

    if (t === "polytechnic") setPolyFile(null);
    if (t === "degree") setDegFile(null);

    fetchSections(t);
  };

  /* ================= PREVIEW ================= */
  const previewUrl = polyFile ? URL.createObjectURL(polyFile) : null;
  const currentSection = sections.find((s) => s.section === polySection);

  return (
    <div className="dashboard-box">
      <div className="card-name">Gallery</div>

      <div className="secondary-box">
        <div className="gallery-wrapper">

          <div className="gallery-top-box">
            <div className="gallery-type-toggle">
              <button
                className={`gallery-type-btn ${type === "degree" ? "active" : ""}`}
                onClick={() => setType("degree")}
              >
                DEGREE
              </button>

              <button
                className={`gallery-type-btn ${type === "polytechnic" ? "active" : ""}`}
                onClick={() => setType("polytechnic")}
              >
                POLYTECHNIC
              </button>
            </div>

            <div className="gallery-add-row">
              <input
                type="text"
                placeholder="section name..."
                className="gallery-input"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
              <button className="gallery-add-btn" onClick={addSection}>
                ADD
              </button>
            </div>
          </div>

          <h3 className="gallery-title">Upload images :</h3>

          <div className="gallery-upload-box">
            <select
              className="gallery-select"
              value={polySection}
              onChange={(e) => setPolySection(e.target.value)}
            >
              {sections.map((s) => (
                <option key={s.section}>{s.section}</option>
              ))}
            </select>

            <label className="gallery-file-btn">
              Add Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setPolyFile(e.target.files[0])}
              />
            </label>

            <button
              className="gallery-upload-btn"
              onClick={() => uploadImage(polySection, polyFile, "polytechnic")}
            >
              Upload
            </button>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="preview"
                style={{ width: 120, borderRadius: 6, border: "2px solid #4caf50" }}
              />
            )}

            {currentSection?.img_list.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000${img}`}
                alt=""
                style={{ width: 120, borderRadius: 6 }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
