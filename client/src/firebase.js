import { initializeApp } from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore} from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc7X1IWwzV-n2eIDcSe605brdRWAHYQrQ",
  authDomain: "swe-project-304dd.firebaseapp.com",
  projectId: "swe-project-304dd",
  storageBucket: "swe-project-304dd.appspot.com",
  messagingSenderId: "414472923061",
  appId: "1:414472923061:web:f9cc87465d661fee24dbfc",
  measurementId: "G-7TWZD35N23"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export default firebase