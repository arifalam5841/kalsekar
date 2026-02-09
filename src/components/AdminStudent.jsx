// import React, { useState } from "react";

// const AdminStudent = () => {

//       const [students, setStudents] = useState([
//     { id: 1, name: "Student name", enrollment: "24111590742" },
//     { id: 2, name: "Student name", enrollment: "24111590743" },
//     { id: 3, name: "Student name", enrollment: "24111590744" },
//     { id: 4, name: "Student name", enrollment: "24111590745" },
//   ]);

//   const removeStudent = (id) => {
//     setStudents((prev) => prev.filter((s) => s.id !== id));
//   };
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Students</div>

//       <div className="secondary-box">
//         <div className="student-container">
//           {/* LEFT SIDE */}
//           <div className="student-left">
//             <h2 className="student-title">List of all Students</h2>

//             {/* Search + Filter */}
//             <div className="student-toolbar">
//               <input className="student-search" placeholder="Search..." />

//               <select className="student-filter">
//                 <option>Enrollment</option>
//                 <option>Name</option>
//               </select>
//             </div>

//             {/* SCROLLABLE LIST */}
//             <div className="student-list">
//               {students.map((student) => (
//                 <div key={student.id} className="student-card">
//                   <div className="student-info">
//                     <span className="student-avatar">👤</span>
//                     <span>{student.name}</span>
//                     <span className="student-divider">|</span>
//                     <span>{student.enrollment}</span>
//                   </div>

//                   <div className="student-actions">
//                     <button className="student-btn-edit">Edit</button>
//                     <button
//                       className="student-btn-remove"
//                       onClick={() => removeStudent(student.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="student-vertical-line"></div>

//           {/* RIGHT SIDE */}
//           <div className="student-right">
//             <h2 className="student-title">Add a Student</h2>

//             <label>Enrollment number</label>
//             <input className="student-input" />

//             <label>Create a password</label>
//             <input type="password" className="student-input" />

//             <button className="student-confirm-btn">Confirm</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStudent;



// src/components/AdminStudent.jsx
// src/components/AdminStudent.jsx

// src/components/AdminStudent.jsx

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const AdminStudent = () => {
  const studentsRef = collection(db, "students");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    enrollment: "",
    password: "",
  });

  /* ================= INIT COLLECTION + FETCH ================= */
  useEffect(() => {
    const init = async () => {
      try {
        await setDoc(doc(db, "students", "_init"), { created: true });
      } catch {}
      fetchStudents();
    };
    init();
  }, []);

  /* ================= FETCH ================= */
  const fetchStudents = async () => {
    const snap = await getDocs(studentsRef);

    const list = snap.docs
      .filter((d) => d.id !== "_init")
      .map((d) => ({ id: d.id, ...d.data() }));

    setStudents(list);
  };

  /* ================= ADD ================= */
  const addStudent = async () => {
    if (!form.name || !form.enrollment || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      await addDoc(studentsRef, {
        name: form.name,
        enrollment: form.enrollment,
        password: form.password,
      });

      alert("Student added successfully ✅");
      setForm({ name: "", enrollment: "", password: "" });
      fetchStudents();
    } catch (err) {
      alert("Failed ❌ Check Firestore rules");
      console.error(err);
    }
  };

  /* ================= DELETE ================= */
  const removeStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      alert("Student removed ✅");
      fetchStudents();
    } catch {
      alert("Delete failed ❌");
    }
  };

  /* ================= EDIT ================= */
  const startEdit = (s) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      enrollment: s.enrollment,
      password: s.password,
    });
  };

  const updateStudent = async () => {
    try {
      await updateDoc(doc(db, "students", editingId), {
        name: form.name,
        enrollment: form.enrollment,
        password: form.password,
      });

      alert("Student updated ✅");
      cancelEdit();
      fetchStudents();
    } catch {
      alert("Update failed ❌");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", enrollment: "", password: "" });
  };

  /* ================= SEARCH ================= */
  const filtered = students.filter((s) =>
    `${s.name} ${s.enrollment}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-box">
      <div className="card-name">Students</div>

      <div className="secondary-box">
        <div className="student-container">
          {/* LEFT */}
          <div className="student-left">
            <h2 className="student-title">List of all Students</h2>

            <div className="student-toolbar">
              <input
                className="student-search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* <select className="student-filter">
                <option>Enrollment</option>
                <option>Name</option>
              </select> */}
            </div>

            <div className="student-list">
              {filtered.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="student-info">
                    <span className="student-avatar">👤</span>
                    <span>{student.name}</span>
                    <span className="student-divider">|</span>
                    <span>{student.enrollment}</span>
                  </div>

                  <div className="student-actions">
                    <button
                      className="student-btn-edit"
                      onClick={() => startEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="student-btn-remove"
                      onClick={() => removeStudent(student.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="student-vertical-line"></div>

          {/* RIGHT */}
          <div className="student-right">
            <h2 className="student-title">
              {editingId ? "Edit Student" : "Add a Student"}
            </h2>

            <label>Student name</label>
            <input
              type="text"
              className="student-input"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <label>Enrollment number</label>
            <input
              className="student-input"
              value={form.enrollment}
              onChange={(e) =>
                setForm({ ...form, enrollment: e.target.value })
              }
            />

            <label>Create a password</label>
            <input
              type="password"
              className="student-input"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {!editingId && (
              <button className="student-confirm-btn" onClick={addStudent}>
                Confirm
              </button>
            )}

            {editingId && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="student-confirm-btn" onClick={updateStudent}>
                  Edit
                </button>

                <button
                  className="student-confirm-btn"
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                  }}
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudent;
