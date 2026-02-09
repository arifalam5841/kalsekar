import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import "./index.css";
import "./admindashcss.css";
import "./staffdashboard.css";
import "./studentdash.css";
import "./LoginStyle.css";
import StudentLogin from "./components/StudentLogin";
import Admindashboard from "./components/Admindashboard";
import StaffDashboard from "./components/StaffDashboard";
import AdminLogin from "./components/AdminLogin";
import StaffLogin from "./components/StaffLogin";
import StudentDashboard from "./components/StudentDashboard";
import StudentDegreeDiploma from "./components/StudentDegreeDiploma";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentLogin></StudentLogin>,
    errorElement: <h1>404 error</h1>,
  },

   {
    path: "/selectdetails",
    element: <StudentDegreeDiploma></StudentDegreeDiploma>,
    errorElement: <h1>404 error</h1>,
  },

  {
    path: "/admindashboard",
    element: <Admindashboard></Admindashboard>,
    errorElement: <h1>404 error</h1>,
  },
  {
    path: "/staffdashboard",
    element: <StaffDashboard></StaffDashboard>,
    errorElement: <h1>404 error</h1>,
  },

  {
    path: "/studentdashboard",
    element: <StudentDashboard></StudentDashboard>,
    errorElement: <h1>404 error</h1>,
  },

  {
    path: "/adminlogin",
    element: <AdminLogin></AdminLogin>,
    errorElement: <h1>404 error</h1>,
  },
  {
    path: "/stafflogin",
    element: <StaffLogin></StaffLogin>,
    errorElement: <h1>404 error</h1>,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
