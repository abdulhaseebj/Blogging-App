import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyApm7FW3j43iZjfDiUOkko_VQTqOqCC5lE",
    authDomain: "blog-app12.firebaseapp.com",
    projectId: "blog-app12",
    storageBucket: "blog-app12.appspot.com",
    messagingSenderId: "590207172725",
    appId: "1:590207172725:web:96bc87994f6d161ca1f83c"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
