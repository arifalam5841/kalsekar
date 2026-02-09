// import React from 'react'

// const StudentEvent = () => {
//   return (
//       <div id="events-page">

//       {/* DEGREE EVENTS */}
//       <h1>Degree</h1>

//       <div id="degree-event-section" className="degree-event">

//         {[1, 2, 3, 4].map((_, index) => (
//           <div className="event-block" key={`degree-${index}`}>

//             <div id="poster-cont">
//               {/* <img src={eventPoster} alt="event poster" /> */}
//               <h3>Grand Ceremony of Chief guest</h3>
//             </div>

//             <div id="event-info">
//               <p style={{ color: "rgb(0, 0, 0)" }}>
//                 Venue - Degree hall
//               </p>

//               <p>
//                 {/* <img src={studentIcon} alt="students" /> */}
//                 <span>Class Mechanical &#8226; year-1</span>
//               </p>

//               <p>
//                 {/* <img src={calendarIcon} alt="calendar" /> */}
//                 <span>Starts on 9/10/24 </span>
//                 &#8226;
//                 <span> Ends on 8/10/24 </span>
//               </p>
//             </div>

//           </div>
//         ))}

//       </div>

//       {/* DIPLOMA EVENTS */}
//       <h1>Diploma</h1>

//       <div id="diploma-event-section" className="degree-event">

    
//           <div className="event-block" >

//             <div id="poster-cont">
//               {/* <img src={eventPoster} alt="event poster" /> */}
//               <h3>Grand Ceremony of Chief guest</h3>
//             </div>

//             <div id="event-info">
//               <p style={{ color: "rgb(0, 0, 0)" }}>
//                 Venue - Degree hall
//               </p>

//               <p>
//                 {/* <img src={studentIcon} alt="students" /> */}
//                 <span>Class Mechanical &#8226; year-1</span>
//               </p>

//               <p>
//                 {/* <img src={calendarIcon} alt="calendar" /> */}
//                 <span>Starts on 9/10/24 </span>
//                 &#8226;
//                 <span> Ends on 8/10/24 </span>
//               </p>
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

// export default StudentEvent



import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const StudentEvent = () => {
  const [degreeEvents, setDegreeEvents] = useState([]);
  const [polyEvents, setPolyEvents] = useState([]);

  const eventRef = collection(db, "events");

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    const snap = await getDocs(eventRef);

    const all = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    // separate by type
    const degree = all.filter((e) => e.type === "D");
    const poly = all.filter((e) => e.type === "P");

    setDegreeEvents(degree);
    setPolyEvents(poly);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= CARD COMPONENT =================
  const EventCard = ({ e }) => (
    <div
      className="event-block"
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (e.pdf) window.open(`http://localhost:5000${e.pdf}`, "_blank");
      }}
    >
      {/* Poster */}
      <div id="poster-cont">
        {e.thumbnail ? (
          <img
            src={`http://localhost:5000${e.thumbnail}`}
            alt="poster"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        ) : (
          <div
            style={{
              height: "150px",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No Image
          </div>
        )}

        <h3>{e.title}</h3>
      </div>

      {/* Info */}
      <div id="event-info">
        <p style={{ color: "rgb(0,0,0)" }}>
          Venue - {e.venue}
        </p>

        <p>
          <span>{e.class}</span>
        </p>

        <p>
          <span>Date - {e.date}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div id="events-page">

      {/* ================= DEGREE ================= */}
      <h1>Degree</h1>

      <div id="degree-event-section" className="degree-event">
        {degreeEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          degreeEvents.map((e) => <EventCard key={e.id} e={e} />)
        )}
      </div>


      {/* ================= DIPLOMA ================= */}
      <h1>Diploma</h1>

      <div id="diploma-event-section" className="degree-event">
        {polyEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          polyEvents.map((e) => <EventCard key={e.id} e={e} />)
        )}
      </div>


      {/* ================= FOOTER ================= */}
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

export default StudentEvent;
