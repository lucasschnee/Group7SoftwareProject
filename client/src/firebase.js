// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyCc7X1IWwzV-n2eIDcSe605brdRWAHYQrQ",

  authDomain: "swe-project-304dd.firebaseapp.com",

  databaseURL: "https://swe-project-304dd-default-rtdb.firebaseio.com",

  projectId: "swe-project-304dd",

  storageBucket: "swe-project-304dd.appspot.com",

  messagingSenderId: "414472923061",

  appId: "1:414472923061:web:f9cc87465d661fee24dbfc",

  measurementId: "G-7TWZD35N23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };