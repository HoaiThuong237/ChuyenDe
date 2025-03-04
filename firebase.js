// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2tPp6xNZouhGjPNIuTEssI9OEBgFwYvE",
  authDomain: "ai-integrated-recipe-web-27483.firebaseapp.com",
  projectId: "ai-integrated-recipe-web-27483",
  storageBucket: "ai-integrated-recipe-web-27483.firebasestorage.app",
  messagingSenderId: "411345716310",
  appId: "1:411345716310:web:8ad798d437df12bafc67f7",
  measurementId: "G-495BV766Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);