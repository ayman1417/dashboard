
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoZ3zyU5B8ov9-7Hc4AtUAgIJCOVoJu9U",
  authDomain: "dashboard-2baf8.firebaseapp.com",
  projectId: "dashboard-2baf8",
  storageBucket: "dashboard-2baf8.firebasestorage.app",
  messagingSenderId: "575055094104",
  appId: "1:575055094104:web:808e957bd98e2a670a052d",
  measurementId: "G-W758JTL7B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

