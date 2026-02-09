// import { useState } from "react";
// import mailogo from "../assets/img/mainlogo.avif";
// export default function AdminLogin() {
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

//      <h3 className="login-title" style={{ fontSize: "25px" }}>
//   College Administration Portal
// </h3>

// <p className="login-subtitle">
//   Please sign in with your official admin credentials to manage students,
//   staff, notices, timetables, and other academic records securely.
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
//               type="email"
//               placeholder="Email"
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


import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

import mailogo from "../assets/img/mainlogo.avif";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ allowed admin emails
  const adminEmails = [
    "arifalam5841@gmail.com",
    "kalsekarpolytechnic@gmail.com",
  ];

  // ✅ auto login check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && adminEmails.includes(user.email)) {
        navigate("/admindashboard");
      }
    });

    return () => unsub();
  }, [navigate]);

  // ✅ real firebase login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (!adminEmails.includes(user.email)) {
        alert("❌ Access denied. Not an admin.");
        return;
      }

      navigate("/admindashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="loginmaincont">
      <div className="login-main-card">

        {/* LEFT */}
        <div className="login-left-side">
          <img
            src="https://illustrations.popsy.co/blue/remote-work.svg"
            alt="illustration"
            className="login-floating-img"
          />
        </div>

        {/* RIGHT */}
        <div className="login-right-side">
          <div className="login-logo">
            <img src={mailogo} alt="" className="loginmainlogo" />
          </div>

          <h3 className="login-title" style={{ fontSize: "25px" }}>
            College Administration Portal
          </h3>

          <p className="login-subtitle">
            Please sign in with your official admin credentials to manage
            students, staff, notices, timetables, and records securely.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-input-container">
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
