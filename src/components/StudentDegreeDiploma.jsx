// import React from "react";
// import mailogo from "../assets/img/mainlogo.avif";
// const StudentDegreeDiploma = () => {
//   return (
//     <div id="loginpage">
//       <nav id="login-nav" style={{ padding: "5px 10px" }}>
//         <div
//           id="logo-main-cont"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "flex-start",
//             width: "fit-content",
//           }}
//         >
//           <i id="login-back-btn" className="fa-solid fa-arrow-left"></i>

     
//                <img src={mailogo} alt="" className="mainlogo-2" />
      
//         </div>
//       </nav>

//       <div id="data-store" style={{ display: "none" }}>
//         D2CO
//       </div>

//       <div id="deg-dip" style={{display:"flex"}}>
//         <div id="choose-deg" className="choose-cont">
//           <h2>Degree</h2>
//           <ul>
//             <li id="dy1" onClick={() => {}}>Year 1</li>
//             <li id="dy2" onClick={() => {}}>Year 2</li>
//             <li id="dy3" onClick={() => {}}>Year 3</li>
//             <li id="dy4" onClick={() => {}}>Year 4</li>
//           </ul>
//         </div>

//         <div id="choose-dip" className="choose-cont">
//           <h2>Diploma</h2>
//           <ul>
//             <li id="py1" onClick={() => {}}>Year 1</li>
//             <li id="py2" onClick={() => {}}>Year 2</li>
//             <li id="py3" onClick={() => {}}>Year 3</li>
//           </ul>
//         </div>
//       </div>

//       <div id="branch-choose" style={{display: "none"}}>
//         <h2>Branch</h2>
//         <div id="choose-branch-cont">
//           <li>AO</li>
//           <li>CO</li>
//           <li>CE</li>
//           <li>ME</li>
//           <li>ME</li>
//           <li>ME</li>
//           <li>ME</li>
//           <li>ME</li>
//           <li>DATA SCIENCEC</li>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDegreeDiploma;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mailogo from "../assets/img/mainlogo.avif";

const StudentDegreeDiploma = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  const selectTypeYear = (t, y) => {
    setType(t);
    setYear(y);
    document.getElementById("deg-dip").style.display = "none";
    document.getElementById("branch-choose").style.display = "block";
  };

  const selectBranch = (b) => {
    const code = `${type}${year}${b}`;

    const student = JSON.parse(localStorage.getItem("student"));
    student.code = code;

    localStorage.setItem("student", JSON.stringify(student));

    navigate("/studentdashboard");
  };

  return (
    <div id="loginpage">
      <nav id="login-nav">
        <img src={mailogo} className="mainlogo-2" />
      </nav>

      <div id="deg-dip">
        <div className="choose-cont">
          <h2>Degree</h2>
          <ul>
            <li onClick={() => selectTypeYear("D", 1)}>Year 1</li>
            <li onClick={() => selectTypeYear("D", 2)}>Year 2</li>
            <li onClick={() => selectTypeYear("D", 3)}>Year 3</li>
            <li onClick={() => selectTypeYear("D", 4)}>Year 4</li>
          </ul>
        </div>

        <div className="choose-cont">
          <h2>Diploma</h2>
          <ul>
            <li onClick={() => selectTypeYear("P", 1)}>Year 1</li>
            <li onClick={() => selectTypeYear("P", 2)}>Year 2</li>
            <li onClick={() => selectTypeYear("P", 3)}>Year 3</li>
          </ul>
        </div>
      </div>

      <div id="branch-choose" style={{ display: "none" }}>
        <h2>Branch</h2>
        <div id="choose-branch-cont">
          {["AO", "CO", "CE", "ME", "DS"].map((b) => (
            <li key={b} onClick={() => selectBranch(b)}>
              {b}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDegreeDiploma;
