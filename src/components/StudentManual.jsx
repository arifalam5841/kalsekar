// import React from 'react'
// // import bookImage from "../assets/img/book1.jpg";
// const StudentManual = ({code}) => {
//   return (
//     <div id="manual-page">

//       {/* UNSOLVED */}
//       <h1>Manuals / Books</h1>

//       <div id="unsolved-manual-section" className="manual-scroll-section">
       
//           <div className="manual-book">

//             <img src={bookImage} alt="manual book" />

//             <div id="manual-info">
//               <h3>Rd sharma maths manual</h3>

//               <p
//                 style={{
//                   color: "#0b57d0",
//                   fontWeight: 100,
//                   margin: "10px 0",
//                 }}
//               >
//                 Maths
//               </p>

//               <p>COA year 1</p>
//               <p>Unsolved</p>
//             </div>

//           </div>
   
//       </div>

    

//       {/* FOOTER */}
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

// export default StudentManual



import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const SERVER = "http://localhost:5000";

const StudentManual = () => {
  const [manuals, setManuals] = useState([]);

  /* ================= GET STUDENT CODE ================= */
  const student = JSON.parse(localStorage.getItem("student"));
  const studentCode = student?.code;

  /* ================= FETCH MANUALS ================= */
  useEffect(() => {
    if (studentCode) fetchManuals();
  }, [studentCode]);

  const fetchManuals = async () => {
    const snap = await getDocs(collection(db, "books"));

    const filtered = snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((book) => book.code === studentCode);

    setManuals(filtered);
  };

  return (
    <div id="manual-page">
      <h1>Manuals / Books</h1>

      <div id="unsolved-manual-section" className="manual-scroll-section">
        {manuals.map((book) => (
          <div
            key={book.id}
            className="manual-book"
            onClick={() =>
              book.manual_pdf &&
              window.open(`${SERVER}${book.manual_pdf}`, "_blank")
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={`${SERVER}${book.img}`}
              alt="manual book"
            />

            <div id="manual-info">
              <h3>{book.title}</h3>

              <p
                style={{
                  color: "#0b57d0",
                  fontWeight: 100,
                  margin: "10px 0",
                }}
              >
                {/* {book.code[0]} */}

                 {book.code[0] == "D" ? "Deggree" : "Polytechnic"} - {book.code[2]+book.code[3]}({book.code[1]} year) 
              </p>

              {/* <p>COA year 1</p> */}
              <p>{book.description}</p>
            </div>
          </div>
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

export default StudentManual;
