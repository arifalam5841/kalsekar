// 🔥 Firebase v9+ Modular Setup

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyDKM6B8XRnN6yxd06xJLsXF-L__DW6xhEA",
  authDomain: "college-f2bd2.firebaseapp.com",
  projectId: "college-f2bd2",
  storageBucket: "college-f2bd2.firebasestorage.app",
  messagingSenderId: "850729905855",
  appId: "1:850729905855:web:5058250b074198f506e00a",
  measurementId: "G-N1NNLJETCH",
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);

// ================= SERVICES =================
export const db = getFirestore(app);   // Firestore database
export const auth = getAuth(app);      // Authentication

// ================= ANALYTICS (safe for web only) =================
isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});

export default app;
