// import React from "react";

// const AdminEvent = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Events / Annoucements</div>

//       <div className="secondary-box">
//         <div className="event-wrapper">
//           {/* ========= FORM ========= */}
//           <div className="event-form">
//             <input
//               type="text"
//               placeholder="Event title..."
//               className="event-input full"
//             />

//             <div className="radio-row">
//               <label>
//                 <input type="radio" name="type" /> Degree
//               </label>
//               <label>
//                 <input type="radio" name="type" /> Polytechnic
//               </label>
//             </div>

//             <div className="row">
//               <select className="event-input">
//                 <option>ALL</option>
//                 <option>CO</option>
//                 <option>ME</option>
//                 <option>AO</option>
//                 <option>AN</option>
//                 <option>MK</option>
//                 <option>CE</option>
//               </select>

//               <select className="event-input">
//                 <option>ALL Year</option>
//                 <option>1st Year</option>
//                 <option>2nd Year</option>
//                 <option>3rd Year</option>
//                 <option>4th Year</option>
//               </select>
//             </div>

//             <div className="row">
//               <input
//                 type="text"
//                 placeholder="Venue..."
//                 className="event-input"
//               />
//               <input type="date" className="event-input" />
//             </div>

//             {/* File Buttons */}
//             <div className="file-row">
//               <label className="file-btn">
//                 📄 Add PDF
//                 <input type="file" accept="application/pdf" hidden />
//               </label>

//               <label className="file-btn">
//                  Add Thumbnail
//                 <input type="file" accept="image/*" hidden />
//               </label>
//             </div>

//             <button className="upload-btn">Upload</button>
//           </div>

//           {/* ========= EVENTS LIST ========= */}
//           <h2 className="section-title">All Events</h2>

//           <div className="event-list">
//             <div className="event-card">
//               <div className="card-top">
//                 <span className="date">📅 11/03/25</span>
//                 <span className="badge">Degree</span>
//               </div>

//               <h3 className="card-title">Event Title</h3>

//               <div className="card-details">
//                 <p>🎓 Computer Science</p>
//                 <p>📍 Hall A</p>
//                 <p>📚 1st Year</p>
//               </div>

//               <div className="card-actions">
//                 <button className="view-btn">View PDF</button>
//                 <button className="remove-btn">Remove</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEvent;


// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "../utils/firebase";

// const AdminEvent = () => {
//   const eventRef = collection(db, "events");

//   /* ================= STATE ================= */
//   const [events, setEvents] = useState([]);

//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("D"); // D / P
//   const [branch, setBranch] = useState("CO");
//   const [year, setYear] = useState("1");
//   const [venue, setVenue] = useState("");
//   const [date, setDate] = useState("");
//   const [startsOn, setStartsOn] = useState("");
//   const [file, setFile] = useState(null);

//   /* ================= FETCH ================= */
//   const fetchEvents = async () => {
//     const snap = await getDocs(eventRef);
//     const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     setEvents(list);
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   /* ================= ADD EVENT ================= */
//   const uploadEvent = async () => {
//     if (!title || !date) return alert("Fill required fields");

//     const code = `${type}${year}${branch}`; // D1CO
//     const className = `${
//       type === "D" ? "Degree" : "Polytechnic"
//     } (${branch} - ${year})`;

//     const formData = new FormData();
//     if (file) formData.append("file", file); // 🔥 server expects "file"

//     const res = await fetch("http://localhost:5000/api/notices", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (!data.success) {
//       alert("Upload failed ❌");
//       return;
//     }

//     await addDoc(eventRef, {
//       img: "", // thumbnail not supported by server yet
//       title,
//       venue,
//       date,
//       class: className,
//       type,
//       year: `${year} Year`,
//       pdf: data.pdf || "",
//       starts_on: startsOn,
//       code, // D1CO
//     });

//     alert("Event added ✅");

//     // reset
//     setTitle("");
//     setVenue("");
//     setDate("");
//     setStartsOn("");
//     setFile(null);

//     fetchEvents();
//   };

//   /* ================= REMOVE ================= */
//   const removeEvent = async (id) => {
//     await deleteDoc(doc(db, "events", id));
//     fetchEvents();
//   };

//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Events / Announcements</div>

//       <div className="secondary-box">
//         <div className="event-wrapper">
//           {/* ========= FORM ========= */}
//           <div className="event-form">
//             <input
//               type="text"
//               placeholder="Event title..."
//               className="event-input full"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <div className="radio-row">
//               <label>
//                 <input
//                   type="radio"
//                   checked={type === "D"}
//                   onChange={() => setType("D")}
//                 />
//                 Degree
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   checked={type === "P"}
//                   onChange={() => setType("P")}
//                 />
//                 Polytechnic
//               </label>
//             </div>

//             <div className="row">
//               <select
//                 className="event-input"
//                 value={branch}
//                 onChange={(e) => setBranch(e.target.value)}
//               >
//                 {["CO", "ME", "CE", "AN", "AO", "MK"].map((b) => (
//                   <option key={b}>{b}</option>
//                 ))}
//               </select>

//               <select
//                 className="event-input"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//               >
//                 {[1, 2, 3, 4].map((y) => (
//                   <option key={y} value={y}>
//                     {y} Year
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="row">
//               <input
//                 type="text"
//                 placeholder="Venue..."
//                 className="event-input"
//                 value={venue}
//                 onChange={(e) => setVenue(e.target.value)}
//               />
//               <input
//                 type="date"
//                 className="event-input"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>

//             <input
//               type="date"
//               className="event-input"
//               value={startsOn}
//               onChange={(e) => setStartsOn(e.target.value)}
//             />

//             {/* File */}
//             <div className="file-row">
//               <label className="file-btn">
//                 📄 Add PDF / Image
//                 <input
//                   type="file"
//                   hidden
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//               </label>
//             </div>

//             <button className="upload-btn" onClick={uploadEvent}>
//               Upload
//             </button>
//           </div>

//           {/* ========= EVENTS LIST ========= */}
//           <h2 className="section-title">All Events</h2>

//           <div className="event-list">
//             {events.map((e) => (
//               <div key={e.id} className="event-card">
//                 <div className="card-top">
//                   <span className="date">📅 {e.date}</span>
//                   <span className="badge">{e.type}</span>
//                 </div>

//                 <h3 className="card-title">{e.title}</h3>

//                 <div className="card-details">
//                   <p>🎓 {e.class}</p>
//                   <p>📍 {e.venue}</p>
//                   <p>📚 {e.year}</p>
//                 </div>

//                 <div className="card-actions">
//                   {e.pdf && (
//                     <a
//                       href={`http://localhost:5000${e.pdf}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       <button className="view-btn">View PDF</button>
//                     </a>
//                   )}

//                   <button
//                     className="remove-btn"
//                     onClick={() => removeEvent(e.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEvent;


// ANOTHER 



// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "../utils/firebase";

// const AdminEvent = () => {
//   const eventRef = collection(db, "events");

//   const [events, setEvents] = useState([]);

//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("D");
//   const [branch, setBranch] = useState("CO");
//   const [year, setYear] = useState("1");
//   const [venue, setVenue] = useState("");
//   const [date, setDate] = useState("");
//   const [startsOn, setStartsOn] = useState("");
//   const [file, setFile] = useState(null);

//   const fetchEvents = async () => {
//     const snap = await getDocs(eventRef);
//     const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     setEvents(list);
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const uploadEvent = async () => {
//     if (!title || !date) return alert("Fill required fields");

//     const code = `${type}${year}${branch}`;
//     const className = `${
//       type === "D" ? "Degree" : "Polytechnic"
//     } (${branch} - ${year})`;

//     let filename = "";

//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("http://localhost:5000/api/notices", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!data.success) {
//         alert("Upload failed ❌");
//         return;
//       }

//       filename = data.pdf || data.filename || "";
//     }

//     await addDoc(eventRef, {
//       title,
//       venue,
//       date,
//       class: className,
//       type,
//       year: `${year} Year`,
//       pdf: filename,
//       code,
//     });

//     alert("Event added ✅");

//     setTitle("");
//     setVenue("");
//     setDate("");
//     setStartsOn("");
//     setFile(null);

//     fetchEvents();
//   };

//   const removeEvent = async (id) => {
//     await deleteDoc(doc(db, "events", id));
//     fetchEvents();
//   };

//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Events / Announcements</div>

//       <div className="secondary-box">
//         <div className="event-wrapper">
//           <div className="event-form">
//             <input
//               type="text"
//               placeholder="Event title..."
//               className="event-input full"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <div className="radio-row">
//               <label>
//                 <input
//                   type="radio"
//                   checked={type === "D"}
//                   onChange={() => setType("D")}
//                 />
//                 Degree
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   checked={type === "P"}
//                   onChange={() => setType("P")}
//                 />
//                 Polytechnic
//               </label>
//             </div>

//             <div className="row">
//               <select
//                 className="event-input"
//                 value={branch}
//                 onChange={(e) => setBranch(e.target.value)}
//               >
//                 {["CO", "ME", "CE", "AN", "AO", "MK"].map((b) => (
//                   <option key={b}>{b}</option>
//                 ))}
//               </select>

//               <select
//                 className="event-input"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//               >
//                 {[1, 2, 3, 4].map((y) => (
//                   <option key={y} value={y}>
//                     {y} Year
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="row">
//               <input
//                 type="text"
//                 placeholder="Venue..."
//                 className="event-input"
//                 value={venue}
//                 onChange={(e) => setVenue(e.target.value)}
//               />
//               <input
//                 type="date"
//                 className="event-input"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>

          

//             <div className="file-row">
//               <label className="file-btn">
//                 📄 Add PDF / Image
//                 <input
//                   type="file"
//                   hidden
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//               </label>
//             </div>

//             <button className="upload-btn" onClick={uploadEvent}>
//               Upload
//             </button>
//           </div>

//           <h2 className="section-title">All Events</h2>

//           <div className="event-list">
//             {events.map((e) => (
//               <div key={e.id} className="event-card">
//                 <div className="card-top">
//                   <span className="date">📅 {e.date}</span>
//                   <span className="badge">{e.type}</span>
//                 </div>

//                 <h3 className="card-title">{e.title}</h3>

//                 <div className="card-details">
//                   <p>🎓 {e.class}</p>
//                   <p>📍 {e.venue}</p>
//                   <p>📚 {e.year}</p>
//                 </div>

//                 <div className="card-actions">
//                   {e.pdf && (
//                     <a
//                       href={`http://localhost:5000${e.pdf}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       <button className="view-btn">View PDF</button>
//                     </a>
//                   )}

//                   <button
//                     className="remove-btn"
//                     onClick={() => removeEvent(e.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEvent;




// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "../utils/firebase";

// const AdminEvent = () => {
//   const eventRef = collection(db, "events");

//   const [events, setEvents] = useState([]);

//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("D");
//   const [branch, setBranch] = useState("CO");
//   const [year, setYear] = useState("1");
//   const [venue, setVenue] = useState("");
//   const [date, setDate] = useState("");

//   // ✅ NEW
//   const [pdfFile, setPdfFile] = useState(null);
//   const [thumbFile, setThumbFile] = useState(null);

//   // ================= FETCH EVENTS =================
//   const fetchEvents = async () => {
//     const snap = await getDocs(eventRef);
//     const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     setEvents(list);
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // ================= COMMON FILE UPLOAD =================
//   const uploadFile = async (file) => {
//     if (!file) return "";

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("http://localhost:5000/api/notices", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (!data.success) {
//       alert("Upload failed ❌");
//       return "";
//     }

//     return data.pdf || data.filename || "";
//   };

//   // ================= ADD EVENT =================
//   const uploadEvent = async () => {
//     if (!title || !date) return alert("Fill required fields");

//     const code = `${type}${year}${branch}`;

//     const className =
//       `${type === "D" ? "Degree" : "Polytechnic"} (${branch} - ${year})`;

//     // ✅ upload both separately
//     const pdfPath = await uploadFile(pdfFile);
//     const thumbPath = await uploadFile(thumbFile);

//     await addDoc(eventRef, {
//       title,
//       venue,
//       date,
//       class: className,
//       type,
//       year: `${year} Year`,
//       code,
//       pdf: pdfPath,        // ✅ pdf
//       thumbnail: thumbPath, // ✅ image
//     });

//     alert("Event added ✅");

//     // reset
//     setTitle("");
//     setVenue("");
//     setDate("");
//     setPdfFile(null);
//     setThumbFile(null);

//     fetchEvents();
//   };

//   // ================= DELETE =================
//   const removeEvent = async (id) => {
//     await deleteDoc(doc(db, "events", id));
//     fetchEvents();
//   };

//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Events / Announcements</div>

//       <div className="secondary-box">
//         <div className="event-wrapper">

//           {/* ================= FORM ================= */}
//           <div className="event-form">

//             <input
//               type="text"
//               placeholder="Event title..."
//               className="event-input full"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <div className="radio-row">
//               <label>
//                 <input
//                   type="radio"
//                   checked={type === "D"}
//                   onChange={() => setType("D")}
//                 />
//                 Degree
//               </label>

//               <label>
//                 <input
//                   type="radio"
//                   checked={type === "P"}
//                   onChange={() => setType("P")}
//                 />
//                 Polytechnic
//               </label>
//             </div>

//             <div className="row">
//               <select
//                 className="event-input"
//                 value={branch}
//                 onChange={(e) => setBranch(e.target.value)}
//               >
//                 {["CO", "ME", "CE", "AN", "AO", "MK"].map((b) => (
//                   <option key={b}>{b}</option>
//                 ))}
//               </select>

//               <select
//                 className="event-input"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//               >
//                 {[1, 2, 3, 4].map((y) => (
//                   <option key={y} value={y}>
//                     {y} Year
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="row">
//               <input
//                 type="text"
//                 placeholder="Venue..."
//                 className="event-input"
//                 value={venue}
//                 onChange={(e) => setVenue(e.target.value)}
//               />

//               <input
//                 type="date"
//                 className="event-input"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>

//             {/* ================= FILE BUTTONS ================= */}
//             <div className="file-row">

//               <label className="file-btn">
//                 📄 Upload PDF
//                 <input
//                   type="file"
//                   hidden
//                   accept="application/pdf"
//                   onChange={(e) => setPdfFile(e.target.files[0])}
//                 />
//               </label>

//               <label className="file-btn">
//                 🖼 Upload Thumbnail
//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={(e) => setThumbFile(e.target.files[0])}
//                 />
//               </label>

//             </div>

//             <button className="upload-btn" onClick={uploadEvent}>
//               Upload
//             </button>
//           </div>

//           {/* ================= EVENT LIST ================= */}
//           <h2 className="section-title">All Events</h2>

//           <div className="event-list">
//             {events.map((e) => (
//               <div key={e.id} className="event-card">

//                 <div className="card-top">
//                   <span className="date">📅 {e.date}</span>
//                   <span className="badge">{e.type}</span>
//                 </div>

//                 {/* ✅ show thumbnail */}
//                 {e.thumbnail && (
//                   <img
//                     src={`http://localhost:5000${e.thumbnail}`}
//                     alt="thumb"
//                     style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
//                   />
//                 )}

//                 <h3 className="card-title">{e.title}</h3>

//                 <div className="card-details">
//                   <p>🎓 {e.class}</p>
//                   <p>📍 {e.venue}</p>
//                   <p>📚 {e.year}</p>
//                 </div>

//                 <div className="card-actions">

//                   {e.pdf && (
//                     <a
//                       href={`http://localhost:5000${e.pdf}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       <button className="view-btn">PDF</button>
//                     </a>
//                   )}

//                   <button
//                     className="remove-btn"
//                     onClick={() => removeEvent(e.id)}
//                   >
//                     Remove
//                   </button>

//                 </div>

//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEvent;




import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const AdminEvent = () => {
  const eventRef = collection(db, "events");

  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("D");
  const [branch, setBranch] = useState("CO");
  const [year, setYear] = useState("1");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");

  // ✅ separate files
  const [pdfFile, setPdfFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    const snap = await getDocs(eventRef);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setEvents(list);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= UPLOAD PDF =================
  const uploadPDF = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      alert("PDF upload failed ❌");
      return "";
    }

    return data.pdf || "";
  };

  // ================= UPLOAD IMAGE =================
  const uploadThumbnail = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      alert("Thumbnail upload failed ❌");
      return "";
    }

    return data.img || "";
  };

  // ================= ADD EVENT =================
  const uploadEvent = async () => {
    if (!title || !date) return alert("Fill required fields");

    const code = `${type}${year}${branch}`;

    const className =
      `${type === "D" ? "Degree" : "Polytechnic"} (${branch} - ${year})`;

    // ✅ upload separately
    const pdfPath = await uploadPDF(pdfFile);
    const thumbPath = await uploadThumbnail(thumbFile);

    await addDoc(eventRef, {
      title,
      venue,
      date,
      class: className,
      type,
      year: `${year} Year`,
      code,
      pdf: pdfPath,
      thumbnail: thumbPath,
    });

    alert("Event added ✅");

    setTitle("");
    setVenue("");
    setDate("");
    setPdfFile(null);
    setThumbFile(null);

    fetchEvents();
  };

  // ================= DELETE =================
  const removeEvent = async (id) => {
    await deleteDoc(doc(db, "events", id));
    fetchEvents();
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Events / Announcements</div>

      <div className="secondary-box">
        <div className="event-wrapper">

          {/* ================= FORM ================= */}
          <div className="event-form">

            <input
              type="text"
              placeholder="Event title..."
              className="event-input full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="radio-row">
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

            <div className="row">
              <select
                className="event-input"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {["CO", "ME", "CE", "AN", "AO", "MK"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <select
                className="event-input"
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

            <div className="row">
              <input
                type="text"
                placeholder="Venue..."
                className="event-input"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />

              <input
                type="date"
                className="event-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* ================= FILE BUTTONS ================= */}
            <div className="file-row">

              <label className="file-btn">
                📄 Upload PDF
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </label>

              <label className="file-btn">
                🖼 Upload Thumbnail
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setThumbFile(e.target.files[0])}
                />
              </label>

            </div>

            <button className="upload-btn" onClick={uploadEvent}>
              Upload
            </button>
          </div>

          {/* ================= EVENT LIST ================= */}
          <h2 className="section-title">All Events</h2>

          <div className="event-list">
            {events.map((e) => (
              <div key={e.id} className="event-card">

                <div className="card-top">
                  <span className="date">📅 {e.date}</span>
                  <span className="badge">{e.type}</span>
                </div>

                {/* thumbnail */}
                {e.thumbnail && (
                  <img
                    src={`http://localhost:5000${e.thumbnail}`}
                    alt="thumb"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}

                <h3 className="card-title">{e.title}</h3>

                <div className="card-details">
                  <p>🎓 {e.class}</p>
                  <p>📍 {e.venue}</p>
                  <p>📚 {e.year}</p>
                </div>

                <div className="card-actions">
                  {e.pdf && (
                    <a
                      href={`http://localhost:5000${e.pdf}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="view-btn">PDF</button>
                    </a>
                  )}

                  <button
                    className="remove-btn"
                    onClick={() => removeEvent(e.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminEvent;
