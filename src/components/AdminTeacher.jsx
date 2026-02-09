// import React, { useState } from "react";

// const AdminTeacher = () => {

//   const [teachers, setTeachers] = useState([
//     { id: 1, name: "Teacher name", empId: "24111590742", dept: "Department" },
//     { id: 2, name: "Teacher name", empId: "24111590743", dept: "Department" },
//     { id: 3, name: "Teacher name", empId: "24111590744", dept: "Department" },
//   ]);

//   const removeTeacher = (id) => {
//     setTeachers((prev) => prev.filter((t) => t.id !== id));
//   };
//   return (
//     <div className="dashboard-box">
//       <div className="card-name">Teachers</div>

//       <div className="secondary-box">
//  <div className="teacher-container">

//       {/* LEFT SIDE */}
//       <div className="teacher-left">
//         <h2 className="teacher-title">List of all Teachers</h2>

//         {/* Search + Filter */}
//         <div className="teacher-toolbar">
//           <input
//             className="teacher-search"
//             placeholder="Search..."
//           />

//           <select className="teacher-filter">
//             <option>ID</option>
//             <option>Name</option>
//             <option>Department</option>
//           </select>
//         </div>

//         {/* Scrollable list */}
//         <div className="teacher-list">
//           {teachers.map((teacher) => (
//             <div key={teacher.id} className="teacher-card">

//               <div className="teacher-info">
//                 <span className="teacher-avatar">👤</span>
//                 <span>{teacher.name}</span>
//                 <span className="teacher-divider">|</span>
//                 <span>{teacher.empId}</span>
//                 <span className="teacher-divider">|</span>
//                 <span>{teacher.dept}</span>
//               </div>

//               <div className="teacher-actions">
//                 <button className="teacher-btn-edit">Edit</button>
//                 <button
//                   className="teacher-btn-remove"
//                   onClick={() => removeTeacher(teacher.id)}
//                 >
//                   Remove
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="teacher-vertical-line"></div>

//       {/* RIGHT SIDE */}
//       <div className="teacher-right">
//         <h2 className="teacher-title">Add a Teachers</h2>

//         {/* Polytechnic / Degree */}
//         <div className="teacher-type-toggle">
//           <button className="teacher-type-btn">Polytechnic</button>
//           <button className="teacher-type-btn">Degree</button>
//         </div>

//         {/* Branch radio */}
//         <div className="teacher-branches">
//           <label><input type="radio" name="branch" /> CO</label>
//           <label><input type="radio" name="branch" /> ME</label>
//           <label><input type="radio" name="branch" /> CE</label>
//           <label><input type="radio" name="branch" /> AN</label>
//         </div>

//         <label>Name</label>
//         <input className="teacher-input" />

//         <label>Create Login password</label>
//         <input type="password" className="teacher-input" />

// <div style={{display : "flex", justifyContent:"space-between"}}>
//         <button className="teacher-confirm-btn">Confirm</button>
//         <button className="teacher-confirm-btn">Edit</button>
//         <button className="teacher-confirm-btn" style={{background :"white", color:"black", border:"1px solid black"}}>CANCLE</button>
//         </div>
//       </div>

//     </div>

//       </div>
//     </div>
//   );
// };


// export default AdminTeacher;



// src/components/AdminTeacher.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase"; // ✅ your firebase config file

const AdminTeacher = () => {
  const teacherRef = collection(db, "teachers");

  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    userid: "",
    degreeorpoly: "",
    branch: "",
    password: "",
  });

  /* ================= LOAD DATA ================= */
  const fetchTeachers = async () => {
    const snap = await getDocs(teacherRef);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTeachers(list);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= ADD TEACHER ================= */
  const addTeacher = async () => {
    try {
      await addDoc(teacherRef, form);
      alert("Teacher added successfully ✅");
      resetForm();
      fetchTeachers();
    } catch {
      alert("Failed to add teacher ❌");
    }
  };

  /* ================= REMOVE ================= */
  const removeTeacher = async (id) => {
    try {
      await deleteDoc(doc(db, "teachers", id));
      alert("Teacher removed ✅");
      fetchTeachers();
    } catch {
      alert("Failed to remove ❌");
    }
  };

  /* ================= EDIT ================= */
  const startEdit = (t) => {
    setEditingId(t.id);
    setForm(t);
  };

  const updateTeacher = async () => {
    try {
      await updateDoc(doc(db, "teachers", editingId), form);
      alert("Teacher updated ✅");
      resetForm();
      fetchTeachers();
    } catch {
      alert("Update failed ❌");
    }
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      name: "",
      userid: "",
      degreeorpoly: "",
      branch: "",
      password: "",
    });
    setEditingId(null);
  };

  /* ================= SEARCH ================= */
  const filteredTeachers = teachers.filter((t) =>
    Object.values(t)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-box">
      <div className="card-name">Teachers</div>

      <div className="secondary-box">
        <div className="teacher-container">

          {/* LEFT SIDE */}
          <div className="teacher-left">
            <h2 className="teacher-title">List of all Teachers</h2>

            <div className="teacher-toolbar">
              <input
                className="teacher-search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="teacher-list">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-info">
                    <span>👤</span>
                    <span>{teacher.name}</span>
                    <span className="teacher-divider">|</span>
                    <span>{teacher.userid}</span>
                    <span className="teacher-divider">|</span>
                    <span>{teacher.degreeorpoly}</span>
                    <span className="teacher-divider">|</span>
                    <span>{teacher.branch}</span>
                  </div>

                  <div className="teacher-actions">
                    <button
                      className="teacher-btn-edit"
                      onClick={() => startEdit(teacher)}
                    >
                      Edit
                    </button>

                    <button
                      className="teacher-btn-remove"
                      onClick={() => removeTeacher(teacher.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="teacher-vertical-line"></div>

          {/* RIGHT SIDE */}
          <div className="teacher-right">
            <h2 className="teacher-title">
              {editingId ? "Edit Teacher" : "Add a Teacher"}
            </h2>

            {/* Polytechnic / Degree */}
            <div className="teacher-type-toggle">
              <button
                className="teacher-type-btn"
                style={{
                  background:
                    form.degreeorpoly === "Polytechnic" ? "#2196f3" : "",
                  color:
                    form.degreeorpoly === "Polytechnic" ? "white" : "",
                }}
                onClick={() =>
                  setForm({ ...form, degreeorpoly: "Polytechnic" })
                }
              >
                Polytechnic
              </button>

              <button
                className="teacher-type-btn"
                style={{
                  background: form.degreeorpoly === "Degree" ? "#2196f3" : "",
                  color: form.degreeorpoly === "Degree" ? "white" : "",
                }}
                onClick={() => setForm({ ...form, degreeorpoly: "Degree" })}
              >
                Degree
              </button>
            </div>

            {/* Branch radio */}
            <div className="teacher-branches">
              {["CO", "ME", "CE", "AN"].map((b) => (
                <label key={b}>
                  <input
                    type="radio"
                    name="branch"
                    value={b}
                    checked={form.branch === b}
                    onChange={handleChange}
                  />
                  {b}
                </label>
              ))}
            </div>

            <label>Name</label>
            <input
              name="name"
              className="teacher-input"
              value={form.name}
              onChange={handleChange}
            />

            <label>User ID</label>
            <input
              name="userid"
              className="teacher-input"
              value={form.userid}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              className="teacher-input"
              value={form.password}
              onChange={handleChange}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {!editingId && (
                <button className="teacher-confirm-btn" onClick={addTeacher}>
                  Confirm
                </button>
              )}

              {editingId && (
                <>
                  <button
                    className="teacher-confirm-btn"
                    onClick={updateTeacher}
                  >
                    Edit
                  </button>

                  <button
                    className="teacher-confirm-btn"
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid black",
                    }}
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminTeacher;
