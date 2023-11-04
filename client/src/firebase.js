// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx7X1WwzV-n2eIDcSe605brdRWAHYQrQ",
  authDomain: "swe-project-304dd.firebaseapp.com",
  projectId: "swe-project-304dd",
  storageBucket: "swe-project-304dd.appspot.com",
  messagingSenderId: "414472923061",
  appId: "1:414472923061:web:a49362d4c0968e2f24dbfc",
  measurementId: "G-LNW0TW19WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
