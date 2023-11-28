import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import About from './About';
import Trainers from './Trainers';
import Schedule from './Schedule';
import Discussion from './Discussion';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Login from './pages/Login';
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header"
import { getAuth } from "firebase/auth"

import './App.css';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Footer from './Footer';

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



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);

function App() {

  return (
  <Router>

    
    <Routes>
      <Route path="/" element={
      <div>
        <Header/>
        <Landing/>
      </div>} />
      
      <Route path="/about" element={
      <div>
        <Header/>
        <About/>
      </div>} />

      <Route path="/trainers" element={
      <div>
        <Header/>
        <Trainers/>
      </div>} />
      
      <Route path="/schedule" element={
      <div>
        <Header/>
        <Schedule/>
      </div>} />
      
      <Route path="/discussion" element={
      <div>
        <Header/>
        <Discussion/>
      </div>} />
      
      <Route path="/profile" element={
      <div>
        <Header/>
        <Profile/>
      </div>} />

      <Route path="/login" element={<Login/>} />
      <Route path="/create-account" element={<CreateAccount/>} />
    </Routes>
    
  </Router>
  );
  }
  
  
  export default App;
  