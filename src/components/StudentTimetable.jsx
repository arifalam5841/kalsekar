// import React from 'react'
// import timetableImg from "../assets/img/timetable12.jpeg";

// const TimetableBlock = () => (
//   <div className="timetable-block">
//     <img src={timetableImg} alt="loading" />

//     <div id="timetable-info">
//       <p>&#8226; Diploma</p>
//       <p>&#8226; AO</p>
//       <p>&#8226; Year - 1</p>
//       <p>&#8226; Acadmic - 2024-25</p>
//       <a href="/">OPEN</a>
//     </div>
//   </div>
// );

// const TimetableSection = ({ title, id }) => (
//   <>
//     <h1>{title}</h1>
//     <div className="timetable-section" id={id}>
//       {[1, 2, 3, 4, 5, 6].map((_, i) => (
//         <TimetableBlock key={i} />
//       ))}
//     </div>
//   </>
// );
// const StudentTimetable = () => {
//   return (
//        <div id="timetable-page">

//       <TimetableSection title="Degree" id="degree-timetable" />
//       <TimetableSection title="Diploma" id="diploma-timetable" />

//       <footer className="footer">
//         <p>
//           Developed by <strong>Arif Alam</strong>
//         </p>
//         <p>Diploma - CO first year</p>
//         <p>
//           Email:{" "}
//           <a href="mailto:arifalam5841@gmail.com">
//             arifalam5841@gmail.com
//           </a>
//         </p>
//       </footer>

//     </div>
//   )
// }

// export default StudentTimetable




// import React, { useEffect, useState } from "react";
// import { db } from "../utils/firebase";
// import { collection, getDocs } from "firebase/firestore";

// const SERVER = "http://localhost:5000";

// /* ================= BLOCK ================= */
// const TimetableBlock = ({ item }) => (
//   <div
//     className="timetable-block"
//     onClick={() => item.pdf && window.open(`${SERVER}${item.pdf}`, "_blank")}
//     style={{ cursor: "pointer" }}
//   >
//     <img src={`${SERVER}${item.img}`} alt="timetable" />

//     <div id="timetable-info">
//       <p>• {item.type === "D" ? "Degree" : "Diploma"}</p>
//       <p>• {item.class}</p>
//       <p>• Year - {item.year}</p>
//       <p>• Academic - {item.academic}</p>
//       <a href="#">OPEN</a>
//     </div>
//   </div>
// );

// /* ================= SECTION ================= */
// const TimetableSection = ({ title, data }) => (
//   <>
//     <h1>{title}</h1>

//     <div className="timetable-section">
//       {data.length === 0 ? (
//         <p>No timetables available</p>
//       ) : (
//         data.map((item) => <TimetableBlock key={item.id} item={item} />)
//       )}
//     </div>
//   </>
// );

// /* ================= MAIN PAGE ================= */
// const StudentTimetable = () => {
//   const [degreeData, setDegreeData] = useState([]);
//   const [diplomaData, setDiplomaData] = useState([]);

//   /* ================= GET STUDENT ================= */
//   const student = JSON.parse(localStorage.getItem("student"));
//   const studentCode = student?.code;

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     if (studentCode) fetchTimetables();
//   }, [studentCode]);

//   const fetchTimetables = async () => {
//     const snap = await getDocs(collection(db, "timetables"));

//     const all = snap.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     /* filter by student's branch */
//     const filtered = all.filter(
//       (t) => `${t.type}${t.year}${t.class}` === studentCode
//     );

//     /* split by type */
//     setDegreeData(filtered.filter((t) => t.type === "D"));
//     setDiplomaData(filtered.filter((t) => t.type === "P"));
//   };

//   return (
//     <div id="timetable-page">
//       <TimetableSection title="Degree" data={degreeData} />
//       <TimetableSection title="Diploma" data={diplomaData} />

//       <footer className="footer">
//         <p>
//           Developed by <strong>Arif Alam</strong>
//         </p>
//         <p>Diploma - CO first year</p>
//         <p>
//           Email:{" "}
//           <a href="mailto:arifalam5841@gmail.com">
//             arifalam5841@gmail.com
//           </a>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default StudentTimetable;



import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const SERVER = "http://localhost:5000";

/* ================= BLOCK ================= */
const TimetableBlock = ({ item }) => (
  <div
    className="timetable-block"
    onClick={() => item.pdf && window.open(`${SERVER}${item.pdf}`, "_blank")}
    style={{ cursor: "pointer" }}
  >
    <img src={`${SERVER}${item.img}`} alt="timetable" />

    <div id="timetable-info">
      <p>• {item.type === "D" ? "Degree" : "Diploma"}</p>
      <p>• {item.class}</p>
      <p>• Year - {item.year}</p>
      <p>• Academic - {item.academic}</p>
      <a href="#">OPEN</a>
    </div>
  </div>
);

/* ================= SECTION ================= */
const TimetableSection = ({ title, data }) => (
  <>
    <h1>{title}</h1>

    <div className="timetable-section">
      {data.length === 0 ? (
        <p>No timetables available</p>
      ) : (
        data.map((item) => <TimetableBlock key={item.id} item={item} />)
      )}
    </div>
  </>
);

/* ================= MAIN PAGE ================= */
const StudentTimetable = () => {
  const [degreeData, setDegreeData] = useState([]);
  const [diplomaData, setDiplomaData] = useState([]);

  /* ================= GET STUDENT ================= */
  const student = JSON.parse(localStorage.getItem("student"));
  const studentCode = student?.code;

  /* ================= FETCH ================= */
  useEffect(() => {
    if (studentCode) fetchTimetables();
  }, [studentCode]);

  const fetchTimetables = async () => {
    const snap = await getDocs(collection(db, "timetables"));

    const all = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    /* filter by student's branch */
    const filtered = all.filter(
      (t) => `${t.type}${t.year}${t.class}` === `${t.type}${t.year}${t.class}`
    );

    /* split by type */
    setDegreeData(filtered.filter((t) => t.type === "D"));
    setDiplomaData(filtered.filter((t) => t.type === "P"));
  };

  return (
    <div id="timetable-page">
      <TimetableSection title="Degree" data={degreeData} />
      <TimetableSection title="Diploma" data={diplomaData} />

      <footer className="footer">
        <p>
          Developed by <strong>Arif Alam</strong>
        </p>
        <p>Diploma - CO first year</p>
        <p>
          Email:{" "}
          <a href="mailto:arifalam5841@gmail.com">
            arifalam5841@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default StudentTimetable;
