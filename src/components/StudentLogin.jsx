// import { useState } from "react";
// import mailogo from "../assets/img/mainlogo.avif";
// export default function StudentLogin() {
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

//         <h3 className="login-title" style={{fontSize :"25px"}}>
//           Welcome Back :)
//         </h3>

//         <p className="login-subtitle">
//           To keep connected with us please login with your personal information
//           by email address and password 😉
//         </p>

//         {/* FORM */}
//         <form
//           id="login-loginForm"
//           className="login-form"
//           onSubmit={handleLogin}
//         >
//           {/* Email */}
//           <div className="login-input-container">
//             <input
//               type="number"
//               placeholder="Enrollment"
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import mailogo from "../assets/img/mainlogo.avif";

export default function StudentLogin() {
  const [email, setEmail] = useState(""); // enrollment
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("❌ Please fill all fields");
      return;
    }

    try {
      const q = query(
        collection(db, "students"),
        where("enrollment", "==", email),
        where("password", "==", password)
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        alert("❌ Invalid Enrollment or Password");
        return;
      }

      const student = snap.docs[0].data();

      localStorage.setItem(
        "student",
        JSON.stringify({
          name: student.name,
          enrollment: student.enrollment,
        })
      );

      alert(`✅ Success! Welcome back, ${student.name}`);
      navigate("/selectdetails");
    } catch (err) {
      console.error(err);
      alert("❌ Login failed");
    }
  };

  const handleCreate = () => {
    const card = document.querySelector(".login-main-card");
    card.style.animation = "login-shake 0.5s ease";

    setTimeout(() => {
      alert("🎉 Create Account feature coming soon!");
    }, 200);
  };

  return (
    <div className="loginmaincont">
      <div className="login-main-card" id="login-main-card">
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
            Welcome Back :)
          </h3>

          <p className="login-subtitle">
            To keep connected with us please login with your personal information
            by email address and password 😉
          </p>

          {/* FORM */}
          <form
            id="login-loginForm"
            className="login-form"
            onSubmit={handleLogin}
          >
            <div className="login-input-container">
              <input
                type="number"
                placeholder="Enrollment"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="login-form-footer">
              <label>
                <input type="checkbox" defaultChecked /> Remember Me
              </label>
              <a href="#">Forgot Password?</a>
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
