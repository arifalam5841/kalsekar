// import { useState } from "react";
// import mailogo from "../assets/img/mainlogo.avif";
// export default function StaffLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     alert(`✅ Success! Welcome back, ${email}`);
//   };

//   const handleCreate = () => {
//     const card = document.querySelector(".login-main-card");

//     card.style.animation = "login-shake 0.5s ease";

//     setTimeout(() => {
//       alert("🎉 Create Account feature coming soon!");
//     }, 200);
//   };

//   return (

//     <div className="loginmaincont">
//     <div className="login-main-card" id="login-main-card">
//       {/* LEFT */}
//       <div className="login-left-side">
//         <img
//           src="https://illustrations.popsy.co/blue/remote-work.svg"
//           alt="illustration"
//           className="login-floating-img"
//         />
//       </div>

//       {/* RIGHT */}
//       <div className="login-right-side">
//         <div className="login-logo">
//           {/* 💎 ghostlamp */}

//           <img src={mailogo} alt="" className="loginmainlogo" />
//         </div>

// <h3 className="login-title" style={{ fontSize: "25px" }}>
//   Staff Login Portal
// </h3>

// <p className="login-subtitle">
//   Sign in with your staff credentials to access classes, notices, timetables,
//   and student information.
// </p>

//         {/* FORM */}
//         <form
//           id="login-loginForm"
//           className="login-form"
//           onSubmit={handleLogin}
//         >
//           {/* Email */}
//           <div className="login-input-container">
//             <input
//               type="text"
//               placeholder="User ID"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Password */}
//           <div className="login-input-container">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Footer */}
//           <div className="login-form-footer">
//             <label>
//               <input type="checkbox" defaultChecked /> Remember Me
//             </label>
//             <a href="#">Forgot Password?</a>
//           </div>

//           {/* Buttons */}
//           <div className="login-button-group">
//             <button type="submit" className="login-btn login-btn-login">
//               Login Now
//             </button>
//           </div>

//           {/* Signup */}

//           {/* Social */}
//           {/* <div className="login-social-login">
//             <p>Or you can join with</p>

//             <div className="login-social-icons">
//               <a href="#">G</a>
//               <a href="#">F</a>
//               <a href="#">T</a>
//             </div>
//           </div> */}
//         </form>
//       </div>
//     </div>

//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import mailogo from "../assets/img/mainlogo.avif";

export default function StaffLogin() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const q = query(
        collection(db, "teachers"),
        where("userid", "==", userid)
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        alert("User not found ❌");
        return;
      }

      const teacher = snap.docs[0].data();

      if (teacher.password !== password) {
        alert("Wrong password ❌");
        return;
      }

      // ✅ save login data
      localStorage.setItem(
        "staff",
        JSON.stringify({
          name: teacher.name,
          userid: teacher.userid,
          branch: teacher.branch,
          type: teacher.degreeorpoly,
        })
      );

      navigate("/staffdashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="loginmaincont">
      <div className="login-main-card">
        <div className="login-left-side">
          <img
            src="https://illustrations.popsy.co/blue/remote-work.svg"
            alt=""
            className="login-floating-img"
          />
        </div>

        <div className="login-right-side">
          <div className="login-logo">
            <img src={mailogo} alt="" className="loginmainlogo" />
          </div>

          <h3 className="login-title" style={{ fontSize: "25px" }}>
            Staff Login Portal
          </h3>

          <p className="login-subtitle">
            Sign in with your staff credentials
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-input-container">
              <input
                type="text"
                placeholder="User ID"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
              />
            </div>

            <div className="login-input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-button-group">
              <button type="submit" className="login-btn login-btn-login">
                Login Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
