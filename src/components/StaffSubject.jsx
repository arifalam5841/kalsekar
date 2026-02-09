// import React from "react";

// const StaffSubject = () => {
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Subjects</div>

//       <div className="secondary-box">


// <div className="subject-wrapper">

//       {/* ================= ADD SUBJECT ================= */}
//       <h2 className="subject-title">Add a subject</h2>

//       <div className="subject-form">

//         <input
//           type="text"
//           placeholder="Subject name..."
//           className="subject-input full"
//         />

//         <div className="subject-radio-row">
//           <label><input type="radio" name="type" /> Degree</label>
//           <label><input type="radio" name="type" /> Polytechnic</label>
//         </div>

//         <div className="subject-row">
//           <select className="subject-input">
//             <option>CO</option>
//             <option>CE</option>
//             <option>AO</option>
//             <option>AN</option>
//             <option>ME</option>
//             <option>MK</option>
//           </select>

//           <select className="subject-input">
//             <option>1st Year</option>
//             <option>2nd Year</option>
//             <option>3rd Year</option>
//             <option>4th Year</option>
//           </select>
//         </div>

//         <p className="subject-label">Syllabus</p>

//         <div className="subject-sem-row">

//                <label className="notice-pdf-btn">
//               📎ADD SYLLABUS
//               <input
//                 type="file"
//                 accept=".pdf,image/*"
//                 hidden
      
//               />
//             </label>
//         </div>

//         <button className="subject-add-btn">Add</button>

//       </div>



//       {/* ================= SELECT SUBJECT ================= */}
//       <h3 className="subject-subtitle">
//         Upload notes and practice question papers
//       </h3>

//       <p className="subject-label">Select subject :</p>


// {/* ALL SUBJECTS WILL BE DISPLAY HERE ONLY WITH THE TEACHER USER ID AND THE TEACHE CAN SELECT THE SUBJECT AND THEN ADD NOTICES AND PRACTICE QUESTION PAPER  */}
//       <div className="subject-chip-container">
//         <span className="subject-chip active">Degree - CO (1st year) maths</span>
//         <span className="subject-chip">Diploma - CE (2st year) eglish</span>
//       </div>



//       {/* ================= NOTES ================= */}
//       <h3 className="subject-section-title">NOTES :</h3>

//       <div className="subject-upload-box">

//         <input
//           type="text"
//           placeholder="Chapter name..."
//           className="subject-input"
//         />

//         <input
//           type="text"
//           placeholder="Description..."
//           className="subject-input"
//         />

//         <label className="subject-file-btn">
//           📄 Add PDF
//           <input type="file" accept="application/pdf" hidden />
//         </label>

//         <button className="subject-upload-btn">Upload</button>

//       </div>



//       {/* ================= PRACTICE PAPERS ================= */}
//       <h3 className="subject-section-title">
//         Practice papers / question papers :
//       </h3>

//       <div className="subject-upload-box">

//         <input
//           type="text"
//           placeholder="Chapter name..."
//           className="subject-input"
//         />

//         <input
//           type="text"
//           placeholder="Description..."
//           className="subject-input"
//         />

//         <label className="subject-file-btn">
//           📄 Add PDF
//           <input type="file" accept="application/pdf" hidden />
//         </label>

//         <button className="subject-upload-btn">Upload</button>

//       </div>

//     </div>

//       </div>
//     </div>
//   );
// };

// export default StaffSubject;



import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const StaffSubject = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const subjectRef = collection(db, "subjects");
  const notesRef = collection(db, "notes");
  const practiceRef = collection(db, "practicequestion");

  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("D");
  const [branch, setBranch] = useState("CO");
  const [year, setYear] = useState("1");
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const fetchSubjects = async () => {
    const q = query(subjectRef, where("teacheruserid", "==", staff.userid));
    const snap = await getDocs(q);
    setSubjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const uploadPdf = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data.pdf;
  };

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload-image", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data.img;
  };

  const addSubject = async () => {
    if (!name || !syllabusFile) return alert("Missing fields");

    const code = `${type}${year}${branch}`;
    const subjectcode = `${code}${name.toUpperCase()}${Date.now()}`;

    const syllabusPdf = await uploadPdf(syllabusFile);
    const thumbImg = thumbnail ? await uploadImage(thumbnail) : "";

    await addDoc(subjectRef, {
      name,
      subjectcode,
      code,
      teacheruserid: staff.userid,
      thumbnail_img: thumbImg,
      syllabus: {
        title: name,
        s_pdf: syllabusPdf,
      },
    });

    setName("");
    setSyllabusFile(null);
    setThumbnail(null);
    fetchSubjects();
  };

  const uploadNote = async (collectionRef, status) => {
    if (!activeSubject || !pdfFile) return alert("Select subject");

    const pdf = await uploadPdf(pdfFile);

    await addDoc(collectionRef, {
      subjectcode: activeSubject.subjectcode,
      title: chapter,
      description,
      status,
      code: activeSubject.code,
      teacheruserid: staff.userid,
      question_pdf: pdf,
    });

    setChapter("");
    setDescription("");
    setPdfFile(null);
  };

  return (
    <div className="dashboard-box">
      <div className="card-name">Subjects</div>

      <div className="secondary-box">
        <div className="subject-wrapper">

          <h2 className="subject-title">Add a subject</h2>

          <div className="subject-form">
            <input
              className="subject-input full"
              placeholder="Subject name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="subject-radio-row">
              <label><input type="radio" checked={type==="D"} onChange={()=>setType("D")} /> Degree</label>
              <label><input type="radio" checked={type==="P"} onChange={()=>setType("P")} /> Polytechnic</label>
            </div>

            <div className="subject-row">
              <select className="subject-input" onChange={e=>setBranch(e.target.value)}>
                {["CO","CE","AO","AN","ME","MK"].map(b=><option key={b}>{b}</option>)}
              </select>

              <select className="subject-input" onChange={e=>setYear(e.target.value)}>
                {[1,2,3,4].map(y=><option key={y} value={y}>{y} Year</option>)}
              </select>
            </div>

            <label className="notice-pdf-btn">
              📎 ADD SYLLABUS
              <input type="file" hidden accept=".pdf,image/*" onChange={e=>setSyllabusFile(e.target.files[0])}/>
            </label>

            {/* <label className="notice-pdf-btn">
              🖼 Thumbnail
              <input type="file" hidden accept="image/*" onChange={e=>setThumbnail(e.target.files[0])}/>
            </label> */}

            <button className="subject-add-btn" onClick={addSubject}>Add</button>
          </div>

          <h3 className="subject-subtitle">Select subject :</h3>

          <div className="subject-chip-container">
            {subjects.map(s => (
              <span
                key={s.id}
                className={`subject-chip ${activeSubject?.id===s.id?"active":""}`}
                onClick={()=>setActiveSubject(s)}
              >
                             {s.code[0] == "D" ? "Deggree" : "Polytechnic"} - {s.code[2]+s.code[3]}({s.code[1]} year) {s.name.toUpperCase()}
              </span>
            ))}
          </div>

          <h3 className="subject-section-title">NOTES :</h3>

          <div className="subject-upload-box">
            <input className="subject-input" placeholder="Chapter..." onChange={e=>setChapter(e.target.value)} />
            <input className="subject-input" placeholder="Description..." onChange={e=>setDescription(e.target.value)} />
            <label className="subject-file-btn">
              📄 Add PDF
              <input type="file" hidden accept="application/pdf" onChange={e=>setPdfFile(e.target.files[0])}/>
            </label>
            <button className="subject-upload-btn" onClick={()=>uploadNote(notesRef,"notes")}>Upload</button>
          </div>

          <h3 className="subject-section-title">Practice papers :</h3>

          <div className="subject-upload-box">
            <input className="subject-input" placeholder="Title..." onChange={e=>setChapter(e.target.value)} />
            <input className="subject-input" placeholder="Description..." onChange={e=>setDescription(e.target.value)} />
            <label className="subject-file-btn">
              📄 Add PDF
              <input type="file" hidden accept="application/pdf" onChange={e=>setPdfFile(e.target.files[0])}/>
            </label>
            <button className="subject-upload-btn" onClick={()=>uploadNote(practiceRef,"practice")}>Upload</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StaffSubject;
