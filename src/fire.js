import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6HWhiZ9dgvAGEtS_hVNS-Dq6c8iNkUks",
  authDomain: "project-with-mentor-b5a49.firebaseapp.com",
  projectId: "project-with-mentor-b5a49",
  storageBucket: "project-with-mentor-b5a49.appspot.com",
  messagingSenderId: "115820271895",
  appId: "1:115820271895:web:fa6dfa970514fd3bc6ff52",
  measurementId: "G-XEM0Y0GSB1",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default fire;
