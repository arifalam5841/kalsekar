// import React from 'react'


// const NoticeBlock = ({ withLink }) => (
//   <div className="notice-block">
//     <h3>Notice</h3>
//     <h4>(CO-A first year)</h4>
//     <h5>Date : 5/10/24</h5>

//     <p id="notice-discription">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex
//       aperiam voluptatum nobis! Aspernatur consectetur tempore ut inventore
//       error dolore laboriosam eaque nihil, necessitatibus illum deserunt quam
//       nam, esse quidem?
//     </p>

//     {withLink ? (
//       <a href="/">PDF</a>
//     ) : (
//       <button>PDF</button>
//     )}
//   </div>
// );

// const StudentNotice = ({code}) => {
//   return (
//      <div id="notice-page">

//       <h1>Degree Notices</h1>
//       <div id="degree-notice-section">
//         {[1, 2].map((_, i) => (
//           <NoticeBlock key={i} withLink />
//         ))}

//         {[3, 4, 5, 6].map((_, i) => (
//           <NoticeBlock key={`btn-${i}`} />
//         ))}
//       </div>

//       <h1>Diploma Notices</h1>
//       <div id="diploma-notice-section">
//         {[1, 2, 3, 4, 5].map((_, i) => (
//           <NoticeBlock key={i} />
//         ))}
//       </div>

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

// export default StudentNotice


import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const SERVER = "http://localhost:5000";

/* ================= NOTICE BLOCK ================= */
const NoticeBlock = ({ notice }) => (
  <div className="notice-block">
    <h3>Notice</h3>
    <h4>({notice.class})</h4>
    <h5>Date : {notice.date}</h5>

    <p id="notice-discription">{notice.description}</p>

    {notice.pdf ? (
      <a href={`${SERVER}${notice.pdf}`} target="_blank" rel="noreferrer">
        PDF
      </a>
    ) : (
      <button>PDF</button>
    )}
  </div>
);

/* ================= STUDENT NOTICE ================= */
const StudentNotice = () => {
  const [degreeNotices, setDegreeNotices] = useState([]);
  const [polyNotices, setPolyNotices] = useState([]);

  /* ================= FETCH NOTICES ================= */
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const snap = await getDocs(collection(db, "notice"));

    const degree = [];
    const poly = [];

    snap.docs.forEach((doc) => {
      const data = doc.data();

      // type first letter decides
      if (data.type?.startsWith("D")) {
        degree.push({ id: doc.id, ...data });
      } else if (data.type?.startsWith("P")) {
        poly.push({ id: doc.id, ...data });
      }
    });

    setDegreeNotices(degree);
    setPolyNotices(poly);
  };

  return (
    <div id="notice-page">
      <h1>Degree Notices</h1>
      <div id="degree-notice-section">
        {degreeNotices.map((n) => (
          <NoticeBlock key={n.id} notice={n} />
        ))}
      </div>

      <h1>Diploma Notices</h1>
      <div id="diploma-notice-section">
        {polyNotices.map((n) => (
          <NoticeBlock key={n.id} notice={n} />
        ))}
      </div>

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

export default StudentNotice;

