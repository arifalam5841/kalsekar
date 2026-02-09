// import React from "react";

// import search from "../assets/img/search.png";
// const StudentClasswork = () => {
//   return (
//     <div id="classwork-page">
//       {/* SEARCH BAR */}
//       <div id="class-search-cont">
//         <input type="text" id="class-search" placeholder="Search Chapter" />
//         <img src={search} id="class-seach-btn" alt="search" />
//       </div>

//       {/* CLASSWORK LIST */}
//       <div id="classwork-cont">
//         <a href="plotterpdf (1).pdf" className="classwork">
//           <h3>Matrices</h3>
//           <hr />
//           <p>5/10/24</p>
//           <p>Sandeep Wagh</p>
//           <p id="sub-head">MAT</p>
//         </a>

//         <div className="classwork">
//           <h3>Matrices</h3>
//           <hr />
//           <p>5/10/24</p>
//           <p>Sandeep Wagh</p>
//           <p id="sub-head">MAT</p>
//         </div>

//         <div className="classwork">
//           <h3>Matrices</h3>
//           <hr />
//           <p>5/10/24</p>
//           <p>Sandeep Wagh</p>
//           <p id="sub-head">MAT</p>
//         </div>

//         <div className="classwork">
//           <h3>Matrices</h3>
//           <hr />
//           <p>5/10/24</p>
//           <p>Sandeep Wagh</p>
//           <p id="sub-head">MAT</p>
//         </div>

//         <div className="classwork">
//           <h3>Matrices</h3>
//           <hr />
//           <p>5/10/24</p>
//           <p>Sandeep Wagh</p>
//           <p id="sub-head">MAT</p>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="footer">
//         <p>
//           Developed by <strong>Arif Alam</strong>
//         </p>
//         <p>Diploma - CO first year</p>
//         <p>
//           Email:{" "}
//           <a href="mailto:arifalam5841@gmail.com">arifalam5841@gmail.com</a>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default StudentClasswork;



import React, { useEffect, useState } from "react";
import search from "../assets/img/search.png";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const StudentClasswork = () => {
  const [classworks, setClassworks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const SERVER = "http://localhost:5000";

  /* ================= GET STUDENT ================= */
  const student = JSON.parse(localStorage.getItem("student"));
  const studentCode = student?.code;

  useEffect(() => {
    if (studentCode) fetchClasswork();
  }, [studentCode]);

  /* ================= FETCH CLASSWORK ================= */
  const fetchClasswork = async () => {
    const q = query(
      collection(db, "classwork"),
      where("code", "==", studentCode)
    );

    const snap = await getDocs(q);

    setClassworks(
      snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  /* ================= SEARCH FILTER ================= */
  const filtered = classworks.filter((c) =>
    c.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div id="classwork-page">
      {/* SEARCH BAR */}
      <div id="class-search-cont">
        <input
          type="text"
          id="class-search"
          placeholder="Search Chapter"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <img src={search} id="class-seach-btn" alt="search" />
      </div>

      {/* CLASSWORK LIST */}
      <div id="classwork-cont">
        {filtered.map((cw) => (
          <a
            key={cw.id}
            href={`${SERVER}${cw.ques_pdf}`}
            target="_blank"
            rel="noreferrer"
            className="classwork"
          >
            <h3>{cw.title}</h3>
            <hr />
            <p>{cw.date}</p>
            <p>{cw.teacher}</p>
            <p id="sub-head">
              {cw.subject?.substring(0, 3).toUpperCase()}
            </p>
          </a>
        ))}
      </div>

      {/* FOOTER */}
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

export default StudentClasswork;
