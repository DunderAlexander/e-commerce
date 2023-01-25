// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = import.meta.env.VITE_API_KEY;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "e-commerce-a369e.firebaseapp.com",
  projectId: "e-commerce-a369e",
  storageBucket: "e-commerce-a369e.appspot.com",
  messagingSenderId: "903419327052",
  appId: "1:903419327052:web:20a560c35a041168307ae9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
