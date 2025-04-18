import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2tPp6xNZouhGjPNIuTEssI9OEBgFwYvE",
  authDomain: "ai-integrated-recipe-web-27483.firebaseapp.com",
  projectId: "ai-integrated-recipe-web-27483",
  storageBucket: "ai-integrated-recipe-web-27483.firebasestorage.app",
  messagingSenderId: "411345716310",
  appId: "1:411345716310:web:8ad798d437df12bafc67f7",
  measurementId: "G-495BV766Z6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { analytics, storage };

