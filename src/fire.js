// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM8wX-U23apAI1iZmmhYQoGflrE_dRUfE",
  authDomain: "team-project-with-oxana-vika.firebaseapp.com",
  projectId: "team-project-with-oxana-vika",
  storageBucket: "team-project-with-oxana-vika.appspot.com",
  messagingSenderId: "410748894627",
  appId: "1:410748894627:web:fd5b2482cf03c2a70eae16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
